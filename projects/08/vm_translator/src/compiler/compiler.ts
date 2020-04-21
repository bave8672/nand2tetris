enum Segment {
    Argument = "argument",
    Local = "local",
    Static = "static",
    Constant = "constant",
    This = "this",
    That = "that",
    Pointer = "pointer",
    Temp = "temp",
}

enum MemoryAccessCommandType {
    Push = "push",
    Pop = "pop",
}

const captureEnum = (Enum: { [key: string]: string | number }) =>
    `(${Object.values(Enum)
        .map((val) => `(?:${val})`)
        .join("|")})`;

const MEMORY_ACCESS_COMMAND_PATTERN = new RegExp(
    `^${captureEnum(MemoryAccessCommandType)} ${captureEnum(Segment)} (\\d+)$`
);
const EMPTY_PATTERN = /^\s*$/;
const COMMENT_PATTERN = /^\s*\/\/.*$/;
const LABEL_PATTERN = /^\s*label (\w[\w\._\d]*)\s*$/;

interface MemoryAccessCommand {
    type: MemoryAccessCommandType;
    segment: Segment;
    offset: number;
}

const TRUE = 0xfff;
const FALSE = 0x0;
const TMP = 5;

enum ArithmeticCommand {
    Add = "add",
    Sub = "sub",
    Neg = "neg",
    Eq = "eq",
    Gt = "gt",
    Lt = "lt",
    And = "and",
    Or = "or",
    Not = "not",
}

const ARITHMETIC_COMMAND_PATTERN = new RegExp(
    `^${captureEnum(ArithmeticCommand)}$`
);

export class Compiler {
    private static parseMemoryAccessCommand(
        command: string
    ): MemoryAccessCommand | void {
        const tokens = MEMORY_ACCESS_COMMAND_PATTERN.exec(command);
        if (!tokens) {
            return;
        }
        const [, type, segment, index] = tokens;
        return {
            type: type as MemoryAccessCommandType,
            segment: segment as Segment,
            offset: Number.parseInt(index),
        };
    }

    private static parseArithmeticCommand(
        command: string
    ): ArithmeticCommand | void {
        const tokens = ARITHMETIC_COMMAND_PATTERN.exec(command);
        if (!tokens) {
            return;
        }
        return tokens[1] as ArithmeticCommand;
    }

    private static parseLabelCommand(command: string): string | undefined {
        const tokens = LABEL_PATTERN.exec(command);
        if (!tokens) {
            return;
        }
        const [, label] = tokens;
        return label;
    }

    private static getBaseAddress(
        segment: Omit<Segment, Segment.Constant | Segment.Static>,
        offset: number,
        fileName: string
    ): string {
        switch (segment) {
            case Segment.Argument:
                return "ARG";
            case Segment.Local:
                return "LCL";
            case Segment.Pointer:
                return offset ? "THAT" : "THIS";
            case Segment.This:
                return "THIS";
            case Segment.That:
                return "THAT";
            case Segment.Static:
                return `${fileName}.${offset}`;
            case Segment.Temp:
                return `${TMP + offset}`;
            default:
                throw new Error(
                    `Cannot get base address of segment ${segment}`
                );
        }
    }

    /**
     * Sets the A register the memory address of segment[index]
     * Sets M to segment[index]
     */
    private static *selectMemory(
        segment: Omit<Segment, Segment.Constant>,
        offset: number,
        fileName: string
    ): Iterable<string> {
        const baseAddress = this.getBaseAddress(segment, offset, fileName);
        yield `@${baseAddress}\n`;
        if (
            segment === Segment.Static ||
            segment === Segment.Pointer ||
            segment === Segment.Temp
        ) {
            return;
        }
        // add the offset for non-static segments
        yield `D=M\n`;
        yield `@${offset}\n`;
        yield `A=D+A\n`; // A=baseAddress+index
    }

    /**
     * Stores the memory value at segment[index] in the D register
     */
    private static *storeSegmentValueInD(
        segment: Segment,
        index: number,
        fileName: string
    ): Iterable<string> {
        if (segment === Segment.Constant) {
            yield `@${index}\n`;
            yield `D=A\n`;
        } else {
            yield* this.selectMemory(segment, index, fileName);
            yield `D=M\n`;
        }
    }

    private static *incrementStackPointer(): Iterable<string> {
        yield `@SP\n`;
        yield `AM=M+1\n`;
    }

    private static *decrementStackPointer(): Iterable<string> {
        yield `@SP\n`;
        yield `AM=M-1\n`;
    }

    private static *emitMemoryAccessCommand(
        command: MemoryAccessCommand,
        fileName: string
    ): Iterable<string> {
        if (command.type === MemoryAccessCommandType.Push) {
            // Store the memory value in D
            yield* this.storeSegmentValueInD(
                command.segment,
                command.offset,
                fileName
            );
            // Push the value onto the stack
            yield `@SP\n`;
            yield `A=M\n`;
            yield `M=D\n`;
            // SP++
            yield* this.incrementStackPointer();
        } else {
            // SP--
            yield* this.decrementStackPointer();
            // Store the top of the stack's value in D
            yield `D=M\n`;
            // Pop the selected value into the selected segment
            yield* this.selectMemory(command.segment, command.offset, fileName);
            yield `M=D\n`;
        }
    }

    private static *jump(variable: string): Iterable<string> {
        yield `@${variable}\n`;
        yield `0;JMP\n`;
    }

    /**
     * Writes true (-1) or false (0) to the head of the stack
     * according to whether the value of the D register satisfies the given comparison to 0
     * then increments the stack pointer
     */
    private static *dPredicate(
        condition: "LT" | "LE" | "EQ" | "GE" | "GT" | "NE",
        commandId: number
    ): Iterable<string> {
        const $true = `${condition}.${commandId}.true`;
        const $false = `${condition}.${commandId}.false`;
        const $end = `${condition}.${commandId}.end`;
        yield `@${$true}\n`;
        yield `D;J${condition}\n`;
        yield `(${$false})\n`;
        yield `@SP\n`;
        yield `A=M\n`;
        yield `M=0\n`;
        yield* this.jump($end);
        yield `(${$true})\n`;
        yield `@SP\n`;
        yield `A=M\n`;
        yield `M=-1\n`;
        yield `(${$end})\n`;
    }

    private static *emitArithmeticCommand(
        command: ArithmeticCommand,
        commandId: number
    ): Iterable<string> {
        // SP--
        yield* this.decrementStackPointer();
        // D=y; M=x (common for methods with 2 arguments)
        function* storeAndDecrement(): Iterable<string> {
            yield `D=M\n`; // Store RAM[SP]
            yield* Compiler.decrementStackPointer(); // SP--
        }
        if (command === ArithmeticCommand.Add) {
            yield* storeAndDecrement();
            yield `M=D+M\n`;
        } else if (command === ArithmeticCommand.Sub) {
            yield* storeAndDecrement();
            yield `M=M-D\n`;
        } else if (command === ArithmeticCommand.Neg) {
            yield `M=-M\n`;
        } else if (command === ArithmeticCommand.Eq) {
            yield* storeAndDecrement();
            yield `D=M-D\n`; // 0 if x==y
            yield* this.dPredicate("EQ", commandId);
        } else if (command === ArithmeticCommand.Gt) {
            yield* storeAndDecrement();
            yield `D=M-D\n`;
            yield* this.dPredicate("GT", commandId);
        } else if (command === ArithmeticCommand.Lt) {
            yield* storeAndDecrement();
            yield `D=M-D\n`;
            yield* this.dPredicate("LT", commandId);
        } else if (command === ArithmeticCommand.And) {
            yield* storeAndDecrement();
            yield `M=D&M\n`;
        } else if (command === ArithmeticCommand.Or) {
            yield* storeAndDecrement();
            yield `M=D|M\n`;
        } else if (command === ArithmeticCommand.Not) {
            yield `M=!M\n`;
        } else {
            throw new Error(`Unhandled arithmetic command: ${command}`);
        }
        yield* this.incrementStackPointer();
    }

    private static *emitLabelCommand(label: string): Iterable<string> {
        yield `(${label})\n`;
    }

    /**
     * Initialize the stack pointer
     */
    private static *init(): Iterable<string> {
        yield `@256\n`;
        yield `D=A\n`;
        yield `@SP\n`;
        yield `A=D\n`;
    }

    private commandId = 0;
    private requestCommandId() {
        return this.commandId++;
    }

    public async *compile(
        files: Array<{
            lines: AsyncIterable<string>;
            name: string;
        }>
    ): AsyncIterable<string> {
        yield* Compiler.init();
        for (const file of files) {
            let lineNumber = 0;
            for await (const line of file.lines) {
                lineNumber++;
                if (EMPTY_PATTERN.test(line) || COMMENT_PATTERN.test(line)) {
                    continue;
                }
                yield `// ${file.name}:${lineNumber} ${line}\n`;
                const memoryAccessCommand = Compiler.parseMemoryAccessCommand(
                    line
                );
                if (memoryAccessCommand) {
                    yield* Compiler.emitMemoryAccessCommand(
                        memoryAccessCommand,
                        file.name
                    );
                    continue;
                }
                const arithmeticCommand = Compiler.parseArithmeticCommand(line);
                if (arithmeticCommand) {
                    yield* Compiler.emitArithmeticCommand(
                        arithmeticCommand,
                        this.requestCommandId()
                    );
                    continue;
                }
                const label = Compiler.parseLabelCommand(line);
                if (label) {
                    yield* Compiler.emitLabelCommand(label);
                    continue;
                }
                throw new Error(`Unable to parse "${line}"`);
            }
        }
    }
}
