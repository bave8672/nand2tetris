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
const GOTO_PATTERN = /^\s*goto (\w[\w\._\d]*)\s*$/;
const IF_GOTO_PATTERN = /^\s*if-goto (\w[\w\._\d]*)\s*$/;
const FUNCTION_PATTERN = /^\s*function (\w[\w\._\d]*) (\d+)\s*$/;
const CALL_PATTERN = /^\s*call (\w[\w\._\d]*) (\d+)\s*$/;
const RETURN_PATTERN = /^\s*return\s*$/;

interface MemoryAccessCommand {
    type: MemoryAccessCommandType;
    segment: Segment;
    offset: number;
}

interface FunctionCommand {
    name: string;
    locals: number;
}

interface CallCommand {
    name: string;
    arguments: number;
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

enum JumpMnm {
    JLT = "JLT",
    JLE = "JLE",
    JEQ = "JEQ",
    JGE = "JGE",
    JGT = "JGT",
    JNE = "JNE",
    JMP = "JMP",
}

export class Compiler {
    private parseMemoryAccessCommand(
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

    private parseArithmeticCommand(command: string): ArithmeticCommand | void {
        const tokens = ARITHMETIC_COMMAND_PATTERN.exec(command);
        if (!tokens) {
            return;
        }
        return tokens[1] as ArithmeticCommand;
    }

    private parseLabelCommand(command: string): string | undefined {
        const tokens = LABEL_PATTERN.exec(command);
        if (!tokens) {
            return;
        }
        const [, label] = tokens;
        return label;
    }

    private parseGotoCommand(command: string): string | undefined {
        const tokens = GOTO_PATTERN.exec(command);
        if (!tokens) {
            return;
        }
        const [, label] = tokens;
        return label;
    }

    private parseIfGotoCommand(command: string): string | undefined {
        const tokens = IF_GOTO_PATTERN.exec(command);
        if (!tokens) {
            return;
        }
        const [, label] = tokens;
        return label;
    }

    private parseFunctionCommand(command: string): FunctionCommand | undefined {
        const tokens = FUNCTION_PATTERN.exec(command);
        if (!tokens) {
            return;
        }
        const [, name, locals] = tokens;
        return {
            name,
            locals: Number.parseInt(locals),
        };
    }

    private parseCallCommand(command: string): CallCommand | undefined {
        const tokens = CALL_PATTERN.exec(command);
        if (!tokens) {
            return;
        }
        const [, name, args] = tokens;
        return {
            name,
            arguments: Number.parseInt(args),
        };
    }

    private getBaseAddress(
        segment: Omit<Segment, Segment.Constant | Segment.Static>,
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
            case Segment.Static:
                return `${this.fileName}.${offset}`;
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
    private *selectMemory(
        segment: Omit<Segment, Segment.Constant>,
        offset: number
    ): Iterable<string> {
        const baseAddress = this.getBaseAddress(segment, offset);
        yield `@${baseAddress}\n`;
        if (
            segment === Segment.Static ||
            segment === Segment.Pointer ||
            segment === Segment.Temp
        ) {
            return;
        }
        if (offset === 0) {
            yield `A=M\n`;
        } else {
            // add the offset for non-static segments
            yield `D=M\n`;
            yield `@${offset}\n`;
            yield `A=D+A\n`; // A=baseAddress+index
        }
    }

    /**
     * Stores the memory value at segment[index] in the D register
     */
    private *storeSegmentValueInD(
        segment: Segment,
        offset: number
    ): Iterable<string> {
        if (segment === Segment.Constant) {
            yield `@${offset}\n`;
            yield `D=A\n`;
        } else {
            yield* this.selectMemory(segment, offset);
            yield `D=M\n`;
        }
    }

    private *incrementStackPointer(): Iterable<string> {
        yield `@SP\n`;
        yield `AM=M+1\n`;
    }

    private *decrementStackPointer(): Iterable<string> {
        yield `@SP\n`;
        yield `AM=M-1\n`;
    }

    private *pushDOntoStack(): Iterable<string> {
        // Push the value onto the stack
        yield `@SP\n`;
        yield `A=M\n`;
        yield `M=D\n`;
        // SP++
        yield* this.incrementStackPointer();
    }

    private *emitMemoryAccessCommand(
        command: MemoryAccessCommand
    ): Iterable<string> {
        if (command.type === MemoryAccessCommandType.Push) {
            // Store the memory value in D
            yield* this.storeSegmentValueInD(command.segment, command.offset);
            // Push the value onto the stack
            yield* this.pushDOntoStack();
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

    private *jump(
        variable: string,
        comp: "0" | "D" = "0",
        cond: JumpMnm = JumpMnm.JMP
    ): Iterable<string> {
        yield `@${variable}\n`;
        yield `${comp};${cond}\n`;
    }

    /**
     * Writes true (-1) or false (0) to the head of the stack
     * according to whether the value of the D register satisfies the given comparison to 0
     * then increments the stack pointer
     */
    private *dPredicate(
        condition: "LT" | "LE" | "EQ" | "GE" | "GT" | "NE"
    ): Iterable<string> {
        const commandId = this.commandId++;
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

    private *emitArithmeticCommand(
        command: ArithmeticCommand
    ): Iterable<string> {
        const compiler = this;
        // SP--
        yield* this.decrementStackPointer();
        // D=y; M=x (common for methods with 2 arguments)
        function* storeAndDecrement(): Iterable<string> {
            yield `D=M\n`; // Store RAM[SP]
            yield* compiler.decrementStackPointer(); // SP--
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
            yield* this.dPredicate("EQ");
        } else if (command === ArithmeticCommand.Gt) {
            yield* storeAndDecrement();
            yield `D=M-D\n`;
            yield* this.dPredicate("GT");
        } else if (command === ArithmeticCommand.Lt) {
            yield* storeAndDecrement();
            yield `D=M-D\n`;
            yield* this.dPredicate("LT");
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

    private buildFunctionLabel(functionName: string): string {
        return `${this.fileName}.${functionName}`;
    }

    private buildLabel(labelName: string): string {
        return `${this.buildFunctionLabel(this.functionName)}$${labelName}`;
    }

    private *emitLabelCommand(label: string): Iterable<string> {
        yield `(${this.buildLabel(label)})\n`;
    }

    private *emitGotoCommand(label: string): Iterable<string> {
        yield* this.jump(this.buildLabel(label));
    }

    private *emitIfGotoCommand(label: string): Iterable<string> {
        yield* this.decrementStackPointer();
        yield `D=M\n`;
        yield* this.jump(this.buildLabel(label), "D", JumpMnm.JNE);
    }

    private *emitFunctionCommand(command: FunctionCommand): Iterable<string> {
        // (f)
        yield `(${this.buildFunctionLabel(command.name)})\n`;
        // initialise k local variables to 0
        const pushCommand: MemoryAccessCommand = {
            type: MemoryAccessCommandType.Push,
            segment: Segment.Constant,
            offset: 0,
        };
        for (let i = 0; i < command.locals; i++) {
            yield* this.emitMemoryAccessCommand(pushCommand);
        }
    }

    private *pushVariable(variable: string): Iterable<string> {
        yield* this.emitMemoryAccessCommand({
            type: MemoryAccessCommandType.Push,
            segment: Segment.Constant,
            offset: variable as any, // todo: typings - allow variable string for constant push
        });
    }

    private *pushSegmentPointer(segment: Segment): Iterable<string> {
        yield `@${this.getBaseAddress(segment, 0)}\n`;
        yield `D=M\n`;
        yield* this.pushDOntoStack();
    }

    private *emitCallCommand(command: CallCommand): Iterable<string> {
        const returnAddress = `return-address.${this.callId++}`;
        // push return-address
        yield* this.pushVariable(returnAddress);
        // push LCL
        yield* this.pushSegmentPointer(Segment.Local);
        // push ARG
        yield* this.pushSegmentPointer(Segment.Argument);
        // push THIS
        yield* this.pushSegmentPointer(Segment.This);
        // push THAT
        yield* this.pushSegmentPointer(Segment.That);
        // ARG = SP - n - 5
        yield `@SP\n`;
        yield `D=M\n`;
        yield `@${command.arguments + 5}\n`;
        yield `D=D-A\n`;
        yield `@ARG\n`;
        yield `M=D\n`;
        // LCL = SP
        yield `@SP\n`;
        yield `D=M\n`;
        yield `@LCL\n`;
        yield `M=D\n`;
        // goto (f)
        yield* this.jump(command.name);
        // (return-address)
        yield `(${returnAddress})\n`;
    }

    private *emitReturnCommand(): Iterable<string> {
        // FRAME = LCL
        // RET = *(FRAME - 5)
        // *ARG = pop()
        // SP = ARG + 1
        // THAT = *(FRAME - 1)
        // THIS = *(FRAME - 2)
        // ARG = *(FRAME - 3)
        // LCL = *(FRAME - 4)
        // goto RET
    }

    /**
     * Initialize the stack pointer
     */
    private *init(): Iterable<string> {
        yield `@256\n`;
        yield `D=A\n`;
        yield `@SP\n`;
        yield `A=D\n`;
        yield* this.emitCallCommand({
            name: "Sys.init",
            arguments: 0,
        });
    }

    private fileName: string = "";
    private lineNumber = 0;
    private functionName: string = "";
    private commandId = 0;
    private callId = 0;

    public async *compile(
        files: Array<{
            lines: AsyncIterable<string>;
            name: string;
        }>
    ): AsyncIterable<string> {
        yield* this.init();
        for (const file of files) {
            this.fileName = file.name;
            this.lineNumber = 0;
            for await (const line of file.lines) {
                this.lineNumber++;
                if (EMPTY_PATTERN.test(line) || COMMENT_PATTERN.test(line)) {
                    continue;
                }
                yield `// ${this.fileName}:${this.lineNumber} ${line}\n`;
                const memoryAccessCommand = this.parseMemoryAccessCommand(line);
                if (memoryAccessCommand) {
                    yield* this.emitMemoryAccessCommand(memoryAccessCommand);
                    continue;
                }
                const arithmeticCommand = this.parseArithmeticCommand(line);
                if (arithmeticCommand) {
                    yield* this.emitArithmeticCommand(arithmeticCommand);
                    continue;
                }
                const label = this.parseLabelCommand(line);
                if (label) {
                    yield* this.emitLabelCommand(label);
                    continue;
                }
                const gotoCommand = this.parseGotoCommand(line);
                if (gotoCommand) {
                    yield* this.emitGotoCommand(gotoCommand);
                    continue;
                }
                const ifGotoCommand = this.parseIfGotoCommand(line);
                if (ifGotoCommand) {
                    yield* this.emitIfGotoCommand(ifGotoCommand);
                    continue;
                }
                const functionCommand = this.parseFunctionCommand(line);
                if (functionCommand) {
                    yield* this.emitFunctionCommand(functionCommand);
                    continue;
                }
                const callCommand = this.parseCallCommand(line);
                if (callCommand) {
                    yield* this.emitCallCommand(callCommand);
                    continue;
                }
                if (RETURN_PATTERN.test(line)) {
                    yield* this.emitReturnCommand();
                    continue;
                }
                throw new Error(`Unable to parse "${line}"`);
            }
        }
    }
}
