import { Compiler } from "../src/compiler/compiler";

describe(`compiler`, () => {
    let compiler: Compiler;

    beforeEach(() => {
        compiler = new Compiler();
    });

    it(`should throw when command is invalid`, async (done) => {
        try {
            for await (const line of compiler.compile(
                lines(`babaganoush`),
                "file_name"
            )) {
                continue;
            }
        } catch (err) {
            done();
        }
    });

    it(`should push a constant onto the stack`, async () => {
        await expectLines(
            compiler.compile(lines(`push constant 17`), "file_name"),
            [
                // Select
                `@17\n`,
                `D=A\n`,
                // Push
                `@SP\n`,
                `A=M\n`,
                `M=D\n`,
                // SP++
                `@SP\n`,
                `M=M+1\n`,
            ]
        );
    });

    it(`should push an argument onto the stack`, async () => {
        await expectLines(
            compiler.compile(lines(`push argument 2`), "file_name"),
            [
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
                `M=M+1\n`,
            ]
        );
    });

    it(`should push an argument onto the stack`, async () => {
        await expectLines(
            compiler.compile(lines(`push argument 2`), "file_name"),
            [
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
                `M=M+1\n`,
            ]
        );
    });

    it(`should push a local variable onto the stack`, async () => {
        await expectLines(
            compiler.compile(lines(`push local 999`), "file_name"),
            [
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
                `M=M+1\n`,
            ]
        );
    });

    it(`should pop off the stack into a local variable`, async () => {
        await expectLines(
            compiler.compile(lines(`pop static 1`), "file_name"),
            [
                // SP--
                `@SP\n`,
                `M=M-1\n`,
                `D=M\n`,
                // Select
                `@file_name.1\n`,
                // Pop
                `M=D\n`,
            ]
        );
    });

    it(`should pop off the stack into a local variable`, async () => {
        await expectLines(compiler.compile(lines(`pop local 1`), "file_name"), [
            // SP--
            `@SP\n`,
            `M=M-1\n`,
            `D=M\n`,
            // Select
            `@LCL\n`,
            `D=M\n`,
            `@1\n`,
            `A=D+A\n`,
            // Pop
            `M=D\n`,
        ]);
    });

    it(`should push a static variable onto the stack`, async () => {
        await expectLines(
            compiler.compile(lines(`push static 1`), "file_name"),
            [
                // Select
                `@file_name.1\n`,
                `D=M\n`,
                // Push
                `@SP\n`,
                `A=M\n`,
                `M=D\n`,
                // SP++
                `@SP\n`,
                `M=M+1\n`,
            ]
        );
    });

    it(`should pop off the stack into a static variable`, async () => {
        await expectLines(
            compiler.compile(lines(`pop static 100`), "file_name"),
            [
                // SP--
                `@SP\n`,
                `M=M-1\n`,
                `D=M\n`,
                // Select
                `@file_name.100\n`,
                // Pop
                `M=D\n`,
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
        let i = 0;
        for await (const line of lines) {
            if (line !== expected[i]) {
                throw new Error(
                    `Line ${i}, expected ${expected[i]}, got ${line}`
                );
            }
            i++;
        }
        expect(i).toBe(expected.length);
    }
});
