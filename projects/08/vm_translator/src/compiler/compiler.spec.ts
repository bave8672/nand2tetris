import { Compiler } from "./compiler";

describe(`compiler`, () => {
    const init = [
        `@256\n`,
        `D=A\n`,
        `@SP\n`,
        `A=D\n`,
        "@return-address.0\n",
        "D=A\n",
        "@SP\n",
        "A=M\n",
        "M=D\n",
        "@SP\n",
        "AM=M+1\n",
        "@LCL\n",
        "D=M\n",
        "@SP\n",
        "A=M\n",
        "M=D\n",
        "@SP\n",
        "AM=M+1\n",
        "@ARG\n",
        "D=M\n",
        "@SP\n",
        "A=M\n",
        "M=D\n",
        "@SP\n",
        "AM=M+1\n",
        "@THIS\n",
        "D=M\n",
        "@SP\n",
        "A=M\n",
        "M=D\n",
        "@SP\n",
        "AM=M+1\n",
        "@THAT\n",
        "D=M\n",
        "@SP\n",
        "A=M\n",
        "M=D\n",
        "@SP\n",
        "AM=M+1\n",
        "@SP\n",
        "D=M\n",
        "@5\n",
        "D=D-A\n",
        "@ARG\n",
        "M=D\n",
        "@SP\n",
        "D=M\n",
        "@LCL\n",
        "M=D\n",
        "@Sys.init\n",
        "0;JMP\n",
        "(return-address.0)\n",
    ];

    let compiler: Compiler;

    beforeEach(() => {
        compiler = new Compiler();
    });

    it(`should throw when command is invalid`, async (done) => {
        try {
            for await (const line of compiler.compile([
                { lines: lines(`babaganoush`), name: "file_name" },
            ])) {
                continue;
            }
        } catch (err) {
            done();
        }
    });

    it(`should skip empty lines`, async () => {
        await expectLines(
            compiler.compile([{ lines: lines(``), name: "file_name" }]),
            [...init]
        );
    });

    it(`should skip commented`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`   // hello `, "// world"), name: "file_name" },
            ]),
            [...init]
        );
    });

    it(`should push a constant onto the stack`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`push constant 17`), name: "file_name" },
            ]),
            [
                ...init,
                // Select
                `@17\n`,
                `D=A\n`,
                // Push
                `@SP\n`,
                `A=M\n`,
                `M=D\n`,
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should push an argument onto the stack`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`push argument 2`), name: "file_name" },
            ]),
            [
                ...init,
                // Select
                `@ARG\n`,
                `D=M\n`,
                `@2\n`,
                `A=D+A\n`,
                `D=M\n`,
                // Push
                `@SP\n`,
                `A=M\n`,
                `M=D\n`,
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should push an argument onto the stack`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`push argument 2`), name: "file_name" },
            ]),
            [
                ...init,
                // Select
                `@ARG\n`,
                `D=M\n`,
                `@2\n`,
                `A=D+A\n`,
                `D=M\n`,
                // Push
                `@SP\n`,
                `A=M\n`,
                `M=D\n`,
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should push a local variable onto the stack`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`push local 999`), name: "file_name" },
            ]),
            [
                ...init,
                // Select
                `@LCL\n`,
                `D=M\n`,
                `@999\n`,
                `A=D+A\n`,
                `D=M\n`,
                // Push
                `@SP\n`,
                `A=M\n`,
                `M=D\n`,
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should pop off the stack into a local variable`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`pop local 1`), name: "file_name" },
            ]),
            [
                ...init,
                // SP--
                `@SP\n`,
                `AM=M-1\n`,
                `D=M\n`,
                // Select
                `@LCL\n`,
                `D=M\n`,
                `@1\n`,
                `A=D+A\n`,
                // Pop
                `M=D\n`,
            ]
        );
    });

    it(`should push a this variable onto the stack`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`push this 999`), name: "file_name" },
            ]),
            [
                ...init,
                // Select
                `@THIS\n`,
                `D=M\n`,
                `@999\n`,
                `A=D+A\n`,
                `D=M\n`,
                // Push
                `@SP\n`,
                `A=M\n`,
                `M=D\n`,
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should pop off the stack into a this variable`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`pop this 1`), name: "file_name" },
            ]),
            [
                ...init,
                // SP--
                `@SP\n`,
                `AM=M-1\n`,
                `D=M\n`,
                // Select
                `@THIS\n`,
                `D=M\n`,
                `@1\n`,
                `A=D+A\n`,
                // Pop
                `M=D\n`,
            ]
        );
    });

    it(`should push a that variable onto the stack`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`push that 999`), name: "file_name" },
            ]),
            [
                ...init,
                // Select
                `@THAT\n`,
                `D=M\n`,
                `@999\n`,
                `A=D+A\n`,
                `D=M\n`,
                // Push
                `@SP\n`,
                `A=M\n`,
                `M=D\n`,
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should pop off the stack into a that variable`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`pop that 1`), name: "file_name" },
            ]),
            [
                ...init,
                // SP--
                `@SP\n`,
                `AM=M-1\n`,
                `D=M\n`,
                // Select
                `@THAT\n`,
                `D=M\n`,
                `@1\n`,
                `A=D+A\n`,
                // Pop
                `M=D\n`,
            ]
        );
    });

    it(`should pop off the stack into a static variable`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`pop static 1`), name: "file_name" },
            ]),
            [
                ...init,
                // SP--
                `@SP\n`,
                `AM=M-1\n`,
                `D=M\n`,
                // Select
                `@file_name.1\n`,
                // Pop
                `M=D\n`,
            ]
        );
    });

    it(`should push a static variable onto the stack`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`push static 1`), name: "file_name" },
            ]),
            [
                ...init,
                // Select
                `@file_name.1\n`,
                `D=M\n`,
                // Push
                `@SP\n`,
                `A=M\n`,
                `M=D\n`,
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should push a temp variable onto the stack`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`push temp 1`), name: "file_name" },
            ]),
            [
                ...init,
                // Select
                `@6\n`,
                `D=M\n`,
                // Push
                `@SP\n`,
                `A=M\n`,
                `M=D\n`,
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should pop off the stack into a temp variable`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`pop temp 0`), name: "file_name" },
            ]),
            [
                ...init,
                // Select
                // SP--
                `@SP\n`,
                `AM=M-1\n`,
                `D=M\n`,
                // Select
                `@5\n`,
                // Pop
                `M=D\n`,
            ]
        );
    });

    it(`should pop off the stack into a static variable`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`pop static 100`), name: "file_name" },
            ]),
            [
                ...init,
                // SP--
                `@SP\n`,
                `AM=M-1\n`,
                `D=M\n`,
                // Select
                `@file_name.100\n`,
                // Pop
                `M=D\n`,
            ]
        );
    });

    it(`should push a pointer onto the stack 0`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`push pointer 0`), name: "file_name" },
            ]),
            [
                ...init,
                // Select
                `@THIS\n`,
                `D=M\n`,
                // Push
                `@SP\n`,
                `A=M\n`,
                `M=D\n`,
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should push a pointer onto the stack 1`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`push pointer 1`), name: "file_name" },
            ]),
            [
                ...init,
                // Select
                `@THAT\n`,
                `D=M\n`,
                // Push
                `@SP\n`,
                `A=M\n`,
                `M=D\n`,
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should pop a pointer off the stack 0`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`pop pointer 0`), name: "file_name" },
            ]),
            [
                ...init,
                // SP--
                `@SP\n`,
                `AM=M-1\n`,
                `D=M\n`,
                // Select
                `@THIS\n`,
                // Pop
                `M=D\n`,
            ]
        );
    });

    it(`should pop a pointer off the stack 1`, async () => {
        await expectLines(
            compiler.compile([
                { lines: lines(`pop pointer 1`), name: "file_name" },
            ]),
            [
                ...init,
                // SP--
                `@SP\n`,
                `AM=M-1\n`,
                `D=M\n`,
                // Select
                `@THAT\n`,
                // Pop
                `M=D\n`,
            ]
        );
    });

    it(`should add two variables together`, async () => {
        await expectLines(
            compiler.compile([{ lines: lines(`add`), name: "file_name" }]),
            [
                ...init,
                "@SP\n",
                "AM=M-1\n",
                "D=M\n",
                "@SP\n",
                "AM=M-1\n",
                "M=D+M\n",
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should subtract two variables`, async () => {
        await expectLines(
            compiler.compile([{ lines: lines(`sub`), name: "file_name" }]),
            [
                ...init,
                "@SP\n",
                "AM=M-1\n",
                "D=M\n",
                "@SP\n",
                "AM=M-1\n",
                "M=M-D\n",
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should negate the top value`, async () => {
        await expectLines(
            compiler.compile([{ lines: lines(`neg`), name: "file_name" }]),
            [
                ...init,
                "@SP\n",
                "AM=M-1\n",
                "M=-M\n", // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should calculate if the top two values are equal`, async () => {
        await expectLines(
            compiler.compile([{ lines: lines(`eq`), name: "file_name" }]),
            [
                ...init,
                "@SP\n",
                "AM=M-1\n",
                "D=M\n",
                "@SP\n",
                "AM=M-1\n",
                "D=M-D\n",
                `@EQ.0.true\n`,
                `D;JEQ\n`,
                `(EQ.0.false)\n`,
                `@SP\n`,
                `A=M\n`,
                `M=0\n`,
                `@EQ.0.end\n`,
                `0;JMP\n`,
                `(EQ.0.true)\n`,
                `@SP\n`,
                `A=M\n`,
                `M=-1\n`,
                `(EQ.0.end)\n`,
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should calculate if the x is greater than y`, async () => {
        await expectLines(
            compiler.compile([{ lines: lines(`gt`), name: "file_name" }]),
            [
                ...init,
                "@SP\n",
                "AM=M-1\n",
                "D=M\n",
                "@SP\n",
                "AM=M-1\n",
                "D=M-D\n",
                `@GT.0.true\n`,
                `D;JGT\n`,
                `(GT.0.false)\n`,
                `@SP\n`,
                `A=M\n`,
                `M=0\n`,
                `@GT.0.end\n`,
                `0;JMP\n`,
                `(GT.0.true)\n`,
                `@SP\n`,
                `A=M\n`,
                `M=-1\n`,
                `(GT.0.end)\n`,
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should calculate if the x is less than y`, async () => {
        await expectLines(
            compiler.compile([{ lines: lines(`lt`), name: "file_name" }]),
            [
                ...init,
                "@SP\n",
                "AM=M-1\n",
                "D=M\n",
                "@SP\n",
                "AM=M-1\n",
                "D=M-D\n",
                `@LT.0.true\n`,
                `D;JLT\n`,
                `(LT.0.false)\n`,
                `@SP\n`,
                `A=M\n`,
                `M=0\n`,
                `@LT.0.end\n`,
                `0;JMP\n`,
                `(LT.0.true)\n`,
                `@SP\n`,
                `A=M\n`,
                `M=-1\n`,
                `(LT.0.end)\n`,
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should calculate x AND y`, async () => {
        await expectLines(
            compiler.compile([{ lines: lines(`and`), name: "file_name" }]),
            [
                ...init,
                "@SP\n",
                "AM=M-1\n",
                "D=M\n",
                "@SP\n",
                "AM=M-1\n",
                "M=D&M\n",
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should calculate x OR y`, async () => {
        await expectLines(
            compiler.compile([{ lines: lines(`or`), name: "file_name" }]),
            [
                ...init,
                "@SP\n",
                "AM=M-1\n",
                "D=M\n",
                "@SP\n",
                "AM=M-1\n",
                "M=D|M\n",
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should calculate NOT y`, async () => {
        await expectLines(
            compiler.compile([{ lines: lines(`not`), name: "file_name" }]),
            [
                ...init,
                "@SP\n",
                "AM=M-1\n",
                "M=!M\n",
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should translate a label command`, async () => {
        (compiler as any).functionName = "MyFn";
        await expectLines(
            compiler.compile([
                { lines: lines(`label LOOP`), name: "file_name" },
            ]),
            [...init, "(file_name.MyFn$LOOP)\n"]
        );
    });

    it(`should translate a goto command`, async () => {
        (compiler as any).functionName = "MyFn";
        await expectLines(
            compiler.compile([
                { lines: lines(`goto LOOP`), name: "file_name" },
            ]),
            [...init, "@file_name.MyFn$LOOP\n", "0;JMP\n"]
        );
    });

    it(`should translate an if-goto command`, async () => {
        (compiler as any).functionName = "MyFn";
        await expectLines(
            compiler.compile([
                { lines: lines(`if-goto LOOP`), name: "file_name" },
            ]),
            [
                ...init,
                "@SP\n",
                "AM=M-1\n",
                "D=M\n",
                "@file_name.MyFn$LOOP\n",
                "D;JNE\n",
            ]
        );
    });

    it(`should translate a function command`, async () => {
        (compiler as any).functionName = "MyFn";
        await expectLines(
            compiler.compile([
                { lines: lines(`function foo 3`), name: "file_name" },
            ]),
            [
                ...init,
                "(file_name.foo)\n",
                // Select
                `@0\n`,
                `D=A\n`,
                // Push
                `@SP\n`,
                `A=M\n`,
                `M=D\n`,
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
                // Select
                `@0\n`,
                `D=A\n`,
                // Push
                `@SP\n`,
                `A=M\n`,
                `M=D\n`,
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
                // Select
                `@0\n`,
                `D=A\n`,
                // Push
                `@SP\n`,
                `A=M\n`,
                `M=D\n`,
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`should translate a call command`, async () => {
        (compiler as any).functionName = "MyFn";
        await expectLines(
            compiler.compile([
                { lines: lines(`call foo 3`), name: "file_name" },
            ]),
            [
                ...init,
                "@return-address.1\n",
                "D=A\n",
                "@SP\n",
                "A=M\n",
                "M=D\n",
                "@SP\n",
                "AM=M+1\n",
                "@LCL\n",
                "D=M\n",
                "@SP\n",
                "A=M\n",
                "M=D\n",
                "@SP\n",
                "AM=M+1\n",
                "@ARG\n",
                "D=M\n",
                "@SP\n",
                "A=M\n",
                "M=D\n",
                "@SP\n",
                "AM=M+1\n",
                "@THIS\n",
                "D=M\n",
                "@SP\n",
                "A=M\n",
                "M=D\n",
                "@SP\n",
                "AM=M+1\n",
                "@THAT\n",
                "D=M\n",
                "@SP\n",
                "A=M\n",
                "M=D\n",
                "@SP\n",
                "AM=M+1\n",
                "@SP\n",
                "D=M\n",
                "@8\n",
                "D=D-A\n",
                "@ARG\n",
                "M=D\n",
                "@SP\n",
                "D=M\n",
                "@LCL\n",
                "M=D\n",
                "@foo\n",
                "0;JMP\n",
                "(return-address.1)\n",
            ]
        );
    });

    it(`should ignore comments proceeding a valid command`, async () => {
        await expectLines(
            compiler.compile([
                {
                    lines: lines(`push constant 17         // whatever`),
                    name: "file_name",
                },
            ]),
            [
                ...init,
                // Select
                `@17\n`,
                `D=A\n`,
                // Push
                `@SP\n`,
                `A=M\n`,
                `M=D\n`,
                // SP++
                `@SP\n`,
                `AM=M+1\n`,
            ]
        );
    });

    it(`Should translate a return command`, async () => {
        await expectLines(
            compiler.compile([
                {
                    lines: lines(`return`),
                    name: "file_name",
                },
            ]),
            [
                ...init,
                "@LCL\n",
                "D=M\n",
                "@R13\n",
                "M=D\n",
                "@5\n",
                "A=D-A\n",
                "D=M\n",
                "@R14\n",
                "M=D\n",
                "@SP\n",
                "AM=M-1\n",
                "D=M\n",
                "@ARG\n",
                "A=M\n",
                "M=D\n",
                "@ARG\n",
                "D=M+1\n",
                "@SP\n",
                "M=D\n",
                "@R13\n",
                "AM=M-1\n",
                "D=M\n",
                "@THAT\n",
                "M=D\n",
                "@R13\n",
                "AM=M-1\n",
                "D=M\n",
                "@THIS\n",
                "M=D\n",
                "@R13\n",
                "AM=M-1\n",
                "D=M\n",
                "@ARG\n",
                "M=D\n",
                "@R13\n",
                "AM=M-1\n",
                "D=M\n",
                "@LCL\n",
                "M=D\n",
                "@R14\n",
                "A=M\n",
                "0;JMP\n",
            ]
        );
    });

    async function* lines(...strs: string[]): AsyncIterable<string> {
        yield* strs;
    }

    async function expectLines(
        lines: AsyncIterable<string>,
        expected: string[]
    ) {
        const testedLines: string[] = [];
        for await (const line of lines) {
            if (/^\/\//.test(line)) {
                // ignore comments
                continue;
            }
            testedLines.push(line);
        }
        expect(testedLines).toEqual(expected);
    }
});
