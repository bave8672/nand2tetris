interface Symbol {
    name?: string;
    address: number;
}

interface Literal {
    address: number;
}

type Address = Symbol | Literal;

enum InstructionType {
    A = "A",
    C = "C",
}

interface AInstruction {
    type: InstructionType.A;
    address: Address;
}

enum JumpMnm {
    JLT = "JLT",
    JLE = "JLE",
    JEQ = "JEQ",
    JGE = "JGE",
    JGT = "JGT",
    JNE = "JNE",
    JMP = "JMP",
}

enum CompMnm {
    Zero = "0",
    One = "1",
    MinusOne = "-1",
    A = "A",
    D = "D",
    M = "M",
    NotA = "!A",
    NotD = "!D",
    NotM = "!M",
    NegA = "-A",
    NegD = "-D",
    NegM = "-M",
    APlus1 = "A+1",
    DPlus1 = "D+1",
    MPlus1 = "M+1",
    AMinus1 = "A-1",
    DMinus1 = "D-1",
    MMinus1 = "M-1",
    DPlusA = "D+A",
    DPlusM = "D+M",
    DMinusA = "D-A",
    DMinusM = "D-M",
    AMinusD = "A-D",
    MMinusD = "M-D",
    DAndA = "D&A",
    DAndM = "D&M",
    DOrA = "D|A",
    DOrM = "D&M",
}

enum StoreMnm {
    M = "M",
    D = "D",
    MD = "MD",
    A = "A",
    AM = "AM",
    AD = "AD",
    AMD = "AMD",
}

const CompInstr: Map<CompMnm, string> = new Map([
    [CompMnm.Zero, "0101010"],
    [CompMnm.One, "0111111"],
    [CompMnm.MinusOne, "0111010"],
    [CompMnm.D, "0001100"],
    [CompMnm.A, "0110000"],
    [CompMnm.M, "1110000"],
    [CompMnm.NotD, "0001101"],
    [CompMnm.NotA, "0110001"],
    [CompMnm.NotM, "1110001"],
    [CompMnm.NegD, "0001111"],
    [CompMnm.NegA, "0110011"],
    [CompMnm.NegM, "1110011"],
    [CompMnm.DPlus1, "0011111"],
    [CompMnm.APlus1, "0110111"],
    [CompMnm.MPlus1, "1110111"],
    [CompMnm.DMinus1, "0001110"],
    [CompMnm.AMinus1, "0110010"],
    [CompMnm.MMinus1, "1110010"],
    [CompMnm.DPlusA, "0000010"],
    [CompMnm.DPlusM, "1000010"],
    [CompMnm.DMinusA, "0010011"],
    [CompMnm.DMinusM, "1010011"],
    [CompMnm.AMinusD, "0000111"],
    [CompMnm.MMinusD, "1000111"],
    [CompMnm.DAndA, "0000000"],
    [CompMnm.DAndM, "1000000"],
    [CompMnm.DOrA, "0010101"],
    [CompMnm.DOrM, "1010101"],
]);

const StoreInstr: Map<StoreMnm | undefined, string> = new Map([
    [undefined, "000"],
    [StoreMnm.M, "001"],
    [StoreMnm.D, "010"],
    [StoreMnm.MD, "011"],
    [StoreMnm.A, "100"],
    [StoreMnm.AM, "101"],
    [StoreMnm.AD, "110"],
    [StoreMnm.AMD, "111"],
]);

const JmpInstr: Map<JumpMnm | undefined, string> = new Map([
    [undefined, "000"],
    [JumpMnm.JGT, "001"],
    [JumpMnm.JEQ, "010"],
    [JumpMnm.JGE, "011"],
    [JumpMnm.JLT, "100"],
    [JumpMnm.JNE, "101"],
    [JumpMnm.JLE, "110"],
    [JumpMnm.JMP, "111"],
]);

interface CInstruction {
    type: InstructionType.C;
    store?: StoreMnm;
    comp: CompMnm;
    jump?: JumpMnm;
}

type Instruction = AInstruction | CInstruction;

const IGNORED_LINE_PATTERN = /^\s*(\/\/.+)?$/; // Matches comments and whitespace, e.g. "   // comment     "
const M_INSTRUCTION_PATTERN = /^\s*@(\S+)\s*(\/\/.+)?$/; // Matches e.g. "  @foo  " -> ["  @foo  ", "foo"]
const ADDRESS_LITERAL_PATTERN = /^\d+$/; // Matches e.g. "123"
const VARIABLE_NAME_PATTERN = /^[a-zA-Z][a-zA-Z\.\$\d_:]*$/;
const LABEL_PATTERN = /^\s*\((\w+)\)\s*$/; // Matches e.g. "  (LOOP) " -> ["...", "LOOP"]
const C_INSTRUCTION_PATTERN = /^\s*(([A-Z]+)\=)?([A-Z\+\-\d]+)(;(\w+))?\s*(\/\/.+)?$/;

export class Compiler {
    private sourceLineNumber = 1;
    private instructionNumber = 0;
    private nextSymbolAddress = 0x11;
    private symbols: Map<string, Symbol> = new Map([
        ["R0", { address: 0x0, name: "R0" }],
        ["R1", { address: 0x1, name: "R1" }],
        ["R2", { address: 0x10, name: "R2" }],
        ["R3", { address: 0x11, name: "R3" }],
        ["R4", { address: 0x100, name: "R4" }],
        ["R5", { address: 0x101, name: "R5" }],
        ["R6", { address: 0x110, name: "R6" }],
        ["R7", { address: 0x111, name: "R7" }],
        ["R8", { address: 0x1000, name: "R8" }],
        ["R9", { address: 0x1001, name: "R9" }],
        ["R10", { address: 0x1010, name: "R10" }],
        ["R11", { address: 0x1011, name: "R11" }],
        ["R12", { address: 0x1100, name: "R12" }],
        ["R13", { address: 0x1101, name: "R13" }],
        ["R14", { address: 0x1110, name: "R14" }],
        ["R15", { address: 0x1111, name: "R15" }],
        ["SP", { address: 0x0, name: "SP" }],
        ["LCL", { address: 0x1, name: "LCL" }],
        ["ARG", { address: 0x10, name: "ARG" }],
        ["THIS", { address: 0x11, name: "THIS" }],
        ["THAT", { address: 0x100, name: "THAT" }],
        ["SCREEN", { address: 0x4000, name: "SCREEN" }],
        ["KBD", { address: 0x6000, name: "KBD" }],
    ]);

    public async *compile(lines: AsyncIterable<string>): AsyncIterable<string> {
        for await (const line of lines) {
            try {
                const instruction = this.parseLine(line);
                if (instruction) {
                    yield this.emit(instruction);
                    this.instructionNumber++;
                }
            } catch (err) {
                throw new Error(`Line ${this.sourceLineNumber}: ${err}`);
            }
            this.sourceLineNumber++;
        }
    }

    private parseLine(line: string): Instruction | void {
        if (IGNORED_LINE_PATTERN.test(line)) {
            return;
        }
        const mInstrTokens = M_INSTRUCTION_PATTERN.exec(line);
        if (mInstrTokens) {
            const [, addressToken] = mInstrTokens;
            return this.buildAInstruction(addressToken);
        }
        const labelTokens = LABEL_PATTERN.exec(line);
        if (labelTokens) {
            const [, symbolToken] = labelTokens;
            return this.buildTokenInstruction(symbolToken);
        }
        const cInstrTokens = C_INSTRUCTION_PATTERN.exec(line);
        if (cInstrTokens) {
            const [, , store, comp, , jump] = cInstrTokens;
            return this.buildCInstruction(store, comp, jump);
        }
        throw new Error(`Unable to parse line ${line}`);
    }

    private buildTokenInstruction(name: string): AInstruction {
        const address = this.allocateSymbol(name);
        address.address = this.instructionNumber + 1;
        return {
            type: InstructionType.A,
            address,
        };
    }

    private buildAInstruction(address: string): AInstruction {
        return {
            type: InstructionType.A,
            address: this.parseAddress(address),
        };
    }

    private buildCInstruction(
        store: string | undefined,
        comp: string,
        jump: string | undefined
    ): CInstruction {
        if (!StoreInstr.has(store as StoreMnm | undefined)) {
            throw new Error(
                `Invalid store value: ${store}. Expected one of ${Array.from(
                    StoreInstr.keys()
                )}`
            );
        } else if (!CompInstr.has(comp as CompMnm)) {
            throw new Error(
                `Invalid cop value: ${comp}. Expected one of ${Array.from(
                    CompInstr.keys()
                )}`
            );
        } else if (!JmpInstr.has(jump as JumpMnm | undefined)) {
            throw new Error(
                `Invalid jump value: ${jump}. Expected one of ${Array.from(
                    JmpInstr.keys()
                )}`
            );
        }
        return {
            type: InstructionType.C,
            store: store as StoreMnm | undefined,
            comp: comp as CompMnm,
            jump: jump as JumpMnm | undefined,
        };
    }

    private parseAddress(address: string): Address {
        if (ADDRESS_LITERAL_PATTERN.test(address)) {
            return {
                address: Number.parseInt(address),
            };
        } else if (VARIABLE_NAME_PATTERN.test(address)) {
            return this.allocateSymbol(address);
        }
        throw new Error(`Expected address or variable, got ${address}`);
    }

    private allocateSymbol(name: string): Symbol {
        let symbol = this.symbols.get(name);
        if (!symbol) {
            // allocate a new symbol address
            symbol = {
                address: this.nextSymbolAddress,
                name,
            };
            this.symbols.set(name, symbol);
            this.nextSymbolAddress++;
        }
        return symbol;
    }

    private emit(instruction: Instruction): string {
        switch (instruction.type) {
            case InstructionType.A:
                return this.emitAInstr(instruction);
            case InstructionType.C:
                return this.emitCInstr(instruction);
        }
    }

    private emitAInstr(instr: AInstruction): string {
        return `0${instr.address.address.toString(2).padStart(15, "0")}\n`;
    }

    private emitCInstr(instr: CInstruction): string {
        return `111${CompInstr.get(instr.comp)}${StoreInstr.get(
            instr.store
        )}${JmpInstr.get(instr.jump)}\n`;
    }
}
