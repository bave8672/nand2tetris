import * as readline from "readline";

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
    `^${captureEnum(MemoryAccessCommandType)} ${captureEnum(
        Segment
    )} (\\d+)\\s*(\\/\\/.*)?$`
);
const EMPTY_PATTERN = /^\s*(\/\/.*)?$/;
const COMMENT_PATTERN = /^\s*\/\/.*$/;
const LABEL_PATTERN = /^\s*label (\w[\w\._\d]*)\s*(\/\/.*)?$/;
const GOTO_PATTERN = /^\s*goto (\w[\w\._\d]*)\s*(\/\/.*)?$/;
const IF_GOTO_PATTERN = /^\s*if-goto (\w[\w\._\d]*)\s*(\/\/.*)?$/;
const FUNCTION_PATTERN = /^\s*function (\w[\w\._\d]*) (\d+)\s*(\/\/.*)?$/;
const CALL_PATTERN = /^\s*call (\w[\w\._\d]*) (\d+)\s*(\/\/.*)?$/;
const RETURN_PATTERN = /^\s*return\s*(\/\/.*)?$/;

interface MemoryAccessCommand {
    type: MemoryAccessCommandType;
    segment: Segment;
    offset: number;
    isPointer?: boolean;
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
    `^${captureEnum(ArithmeticCommand)}\\s*(\\/\\/.*)?$`
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

enum Temp {
    FRAME = "R13", // frame temp variable address
    RET = "R14", // return temp variable address
}

export interface CompilerConfig {}

const CONFIG_DEFAULT: CompilerConfig = {};

export class Compiler {
    public readonly config: CompilerConfig;
    public constructor(config: Partial<CompilerConfig> = {}) {
        this.config = {
            ...CONFIG_DEFAULT,
            ...config,
        };
        console.log(this.config);
    }

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
        offset: number,
        isPointer: boolean = true
    ): Iterable<string> {
        const baseAddress = this.getBaseAddress(segment, offset);
        yield `@${baseAddress}\n`;
        if (
            !isPointer ||
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
        offset: number,
        isPointer: boolean = true
    ): Iterable<string> {
        if (segment === Segment.Constant) {
            yield `@${offset}\n`;
            yield `D=A\n`;
        } else {
            yield* this.selectMemory(segment, offset, isPointer);
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
        command: MemoryAccessCommand,
        tempLocation: "R13" | "R15" = "R13"
    ): Iterable<string> {
        if (command.type === MemoryAccessCommandType.Push) {
            // Store the memory value in D
            yield* this.storeSegmentValueInD(command.segment, command.offset);
            // Push the value onto the stack
            yield* this.pushDOntoStack();
        } else {
            // store the memory location in a temp slot
            yield* this.selectMemory(
                command.segment,
                command.offset,
                command.isPointer
            );
            yield `D=A\n`;
            yield `@${tempLocation}\n`;
            yield `M=D\n`;
            // SP--
            yield* this.decrementStackPointer();
            // Store the top of the stack's value in D
            yield `D=M\n`;
            // Pop the selected value into the selected segment
            yield `@${tempLocation}\n`;
            yield `A=M\n`;
            yield `M=D\n`;
        }
    }

    private *jump(
        variable: string,
        comp: "0" | "D" = "0",
        cond: JumpMnm = JumpMnm.JMP,
        isPointer = false
    ): Iterable<string> {
        yield `@${variable}\n`;
        if (isPointer) {
            yield `A=M\n`;
        }
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
        yield* this.storeSegmentValueInD(Segment.Local, 0, false);
        yield `@${Temp.FRAME}\n`;
        yield `M=D\n`;
        // RET = *(FRAME - 5)
        yield `@5\n`;
        yield `A=D-A\n`;
        yield `D=M\n`;
        yield `@${Temp.RET}\n`;
        yield `M=D\n`;
        // *ARG = pop()
        yield* this.decrementStackPointer();
        yield `D=M\n`;
        yield* this.selectMemory(Segment.Argument, 0, true);
        yield `M=D\n`;
        // SP = ARG + 1
        yield `@ARG\n`;
        yield `D=M+1\n`;
        yield `@SP\n`;
        yield `M=D\n`;
        // THAT = *(FRAME - 1)
        yield `@${Temp.FRAME}\n`;
        yield `AM=M-1\n`;
        yield `D=M\n`;
        yield* this.selectMemory(Segment.That, 0, false);
        yield `M=D\n`;
        // THIS = *(FRAME - 2)
        yield `@${Temp.FRAME}\n`;
        yield `AM=M-1\n`;
        yield `D=M\n`;
        yield* this.selectMemory(Segment.This, 0, false);
        yield `M=D\n`;
        // ARG = *(FRAME - 3)
        yield `@${Temp.FRAME}\n`;
        yield `AM=M-1\n`;
        yield `D=M\n`;
        yield* this.selectMemory(Segment.Argument, 0, false);
        yield `M=D\n`;
        // LCL = *(FRAME - 4)
        yield `@${Temp.FRAME}\n`;
        yield `AM=M-1\n`;
        yield `D=M\n`;
        yield* this.selectMemory(Segment.Local, 0, false);
        yield `M=D\n`;
        // goto RET
        yield* this.jump(Temp.RET, "0", JumpMnm.JMP, true);
    }

    private consoleReplaceLine(progress: string) {
        if (process.stdout.clearLine) {
            process.stdout.clearLine(0);
        }
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(progress);
    }

    /**
     * Initialize the stack pointer
     */
    private *init(): Iterable<string> {
        yield `// Compiled VM code -> hack\n`;
        yield `// init SP\n`;
        yield `@256\n`;
        yield `D=A\n`;
        yield `@SP\n`;
        yield `A=D\n`;
        if (this.emitSys) {
            yield `// Call Sys.init()\n`;
            yield* this.jump("Sys.vm.Sys.init");
            // yield* this.emitCallCommand({
            //     name: "Sys.vm.Sys.init",
            //     arguments: 0,
            // });
        }
    }

    private emitSys: boolean = false;
    private fileName: string = "";
    private lineNumber = 0;
    private functionName: string = "";
    private commandId = 0;
    private callId = 0;

    private *compileLine(line: string): Iterable<string> {
        this.consoleReplaceLine(
            `Compiling ${this.fileName}#${this.lineNumber}`
        );
        this.lineNumber++;
        if (EMPTY_PATTERN.test(line) || COMMENT_PATTERN.test(line)) {
            return;
        }
        yield `// ${this.fileName}:${this.lineNumber} ${line}\n`;
        if (COMMENT_PATTERN.test(line)) {
            return;
        }
        const memoryAccessCommand = this.parseMemoryAccessCommand(line);
        if (memoryAccessCommand) {
            yield* this.emitMemoryAccessCommand(memoryAccessCommand);
            return;
        }
        const arithmeticCommand = this.parseArithmeticCommand(line);
        if (arithmeticCommand) {
            yield* this.emitArithmeticCommand(arithmeticCommand);
            return;
        }
        const label = this.parseLabelCommand(line);
        if (label) {
            yield* this.emitLabelCommand(label);
            return;
        }
        const gotoCommand = this.parseGotoCommand(line);
        if (gotoCommand) {
            yield* this.emitGotoCommand(gotoCommand);
            return;
        }
        const ifGotoCommand = this.parseIfGotoCommand(line);
        if (ifGotoCommand) {
            yield* this.emitIfGotoCommand(ifGotoCommand);
            return;
        }
        const functionCommand = this.parseFunctionCommand(line);
        if (functionCommand) {
            yield* this.emitFunctionCommand(functionCommand);
            return;
        }
        const callCommand = this.parseCallCommand(line);
        if (callCommand) {
            yield* this.emitCallCommand(callCommand);
            return;
        }
        if (RETURN_PATTERN.test(line)) {
            yield* this.emitReturnCommand();
            return;
        }
        throw new Error(`Unable to parse "${line}"`);
    }

    public async *compile(
        files: Array<{ name: string; getLines: () => AsyncIterable<string> }>
    ): AsyncIterable<string> {
        this.emitSys = files.some((file) => file.name === "Sys.vm");
        yield* this.init();
        for (const file of files) {
            console.log(`Compiling ${file.name} ...`);
            this.fileName = file.name;
            this.lineNumber = 0;
            for await (const line of file.getLines()) {
                yield* this.compileLine(line);
            }
            this.consoleReplaceLine(
                `Compiling ${this.fileName} OK (${this.lineNumber} lines emitted)\n`
            );
        }
    }
}
