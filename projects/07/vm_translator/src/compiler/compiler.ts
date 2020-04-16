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
        segment: Omit<Segment, Segment.Constant>,
        offset: number
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
        offset: number
    ): Iterable<string> {
        const baseAddress = this.getBaseAddress(segment, offset);
        yield `@${baseAddress}\n`;
        yield `D=M\n`;
        yield `@${offset}\n`;
        yield `A=D+A\n`; // A=baseAddress+index
    }

    /**
     * Stores the memory value at segment[index] in the D register
     */
    private static *storeSegmentValueInD(
        segment: Segment,
        index: number
    ): Iterable<string> {
        if (segment === Segment.Constant) {
            yield `@${index}\n`;
            yield `D=A\n`;
        } else {
            yield* this.selectMemory(segment, index);
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
        command: MemoryAccessCommand
    ): Iterable<string> {
        if (command.type === MemoryAccessCommandType.Push) {
            // Store the memory value in D
            yield* this.storeSegmentValueInD(command.segment, command.offset);
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
            yield* this.selectMemory(command.segment, command.offset);
            yield `M=D\n`;
        }
    }

    private static *emitArithmeticCommand(
        command: ArithmeticCommand
    ): Iterable<string> {
        // SP--
        yield* this.decrementStackPointer();
        // Store y in D
        yield `D=M\n`;
        // SP--
        yield* this.decrementStackPointer();
        if (command === ArithmeticCommand.Add) {
            yield `M=M+D`;
        } else if (command === ArithmeticCommand.Sub) {
            yield `M=M-D`;
        } else if (command === ArithmeticCommand.Neg) {
            yield `M=-D`;
        } else {
            throw new Error(`TODO...`);
        }
    }

    public async *compile(lines: AsyncIterable<string>): AsyncIterable<string> {
        for await (const line of lines) {
            const memoryAccessCommand = Compiler.parseMemoryAccessCommand(line);
            if (memoryAccessCommand) {
                return yield* Compiler.emitMemoryAccessCommand(
                    memoryAccessCommand
                );
            }
            const arithmeticCommand = Compiler.parseArithmeticCommand(line);
            if (arithmeticCommand) {
                return yield* Compiler.emitArithmeticCommand(arithmeticCommand);
            }
            throw new Error(`Unable to parse "${line}"`);
        }
    }
}
