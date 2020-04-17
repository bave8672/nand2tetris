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

interface MemoryAccessCommand {
    type: MemoryAccessCommandType;
    segment: Segment;
    offset: number;
}

const TRUE = 0xfff;
const FALSE = 0x0;

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
            case Segment.Temp:
                return "R5";
            case Segment.Static:
                return `${fileName}.${offset}`;
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
        if (segment === Segment.Static) {
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
        yield `M=M+1\n`;
    }

    private static *decrementStackPointer(): Iterable<string> {
        yield `@SP\n`;
        yield `M=M-1\n`;
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
     */
    private static *dPredicate(
        condition: "LT" | "LE" | "EQ" | "GE" | "GT" | "NE",
        commandId: number
    ): Iterable<string> {
        const $true = `${condition}.true.${commandId}`;
        const $false = `${condition}.false.${commandId}`;
        const $end = `${condition}.end.${commandId}`;
        yield `@${$true}\n`;
        yield `D;J${condition}\n`;
        yield `(${$false})\n`;
        yield `@SP\n`;
        yield `M=0\n`;
        yield* this.jump($end);
        yield `(${$true})\n`;
        yield `@SP\n`;
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
        function* storeDecrementAndSelect(): Iterable<string> {
            yield `A=M\n`; // Select M=RAM[SP]
            yield `D=M\n`; // Store RAM[SP]
            yield* Compiler.decrementStackPointer(); // SP--
            yield `A=M\n`; // Select RAM[SP]
        }
        if (command === ArithmeticCommand.Add) {
            yield* storeDecrementAndSelect();
            yield `M=D+M\n`;
        } else if (command === ArithmeticCommand.Sub) {
            yield* storeDecrementAndSelect();
            yield `M=M-D\n`;
        } else if (command === ArithmeticCommand.Neg) {
            yield `A=M\n`; // M=y
            yield `M=-M\n`;
        } else if (command === ArithmeticCommand.Eq) {
            yield* storeDecrementAndSelect();
            yield `D=M-D\n`; // 0 if x==y
            yield* this.dPredicate("EQ", commandId);
        } else if (command === ArithmeticCommand.Gt) {
            yield* storeDecrementAndSelect();
            yield `D=M-D\n`;
            yield* this.dPredicate("GT", commandId);
        } else if (command === ArithmeticCommand.Lt) {
            yield* storeDecrementAndSelect();
            yield `D=M-D\n`;
            yield* this.dPredicate("LT", commandId);
        } else if (command === ArithmeticCommand.And) {
            yield* storeDecrementAndSelect();
            yield `M=D&M\n`;
        } else if (command === ArithmeticCommand.Or) {
            yield* storeDecrementAndSelect();
            yield `M=D|M\n`;
        } else if (command === ArithmeticCommand.Not) {
            yield `A=M\n`; // M=y
            yield `M=!M\n`;
        } else {
            throw new Error(`Unhandled arithmetic command: ${command}`);
        }
    }

    private commandId = 0;
    private requestCommandId() {
        return this.commandId++;
    }

    public async *compile(
        lines: AsyncIterable<string>,
        fileName: string
    ): AsyncIterable<string> {
        for await (const line of lines) {
            const memoryAccessCommand = Compiler.parseMemoryAccessCommand(line);
            if (memoryAccessCommand) {
                return yield* Compiler.emitMemoryAccessCommand(
                    memoryAccessCommand,
                    fileName
                );
            }
            const arithmeticCommand = Compiler.parseArithmeticCommand(line);
            if (arithmeticCommand) {
                return yield* Compiler.emitArithmeticCommand(
                    arithmeticCommand,
                    this.requestCommandId()
                );
            }
            throw new Error(`Unable to parse "${line}"`);
        }
    }
}
