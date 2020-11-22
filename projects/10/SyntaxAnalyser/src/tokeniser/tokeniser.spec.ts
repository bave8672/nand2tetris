import { Keyword } from "./keyword";
import { JackSymbol } from "./symbol";
import { Tokeniser } from "./tokeniser";
import { TokenType } from "./token_type";

describe(`tokeniser`, () => {
    describe(`unit tests`, () => {
        it(`should tokenise a simple program`, async () => {
            const tokeniser = new Tokeniser(
                getChars(`
                    // This file is part of www.nand2tetris.org
                    // and the book "The Elements of Computing Systems"
                    // by Nisan and Schocken, MIT Press.
                    // File name: projects/10/ArrayTest/Main.jack

                    // (identical to projects/09/Average/Main.jack)

                    /** Computes the average of a sequence of integers. */
                    class Main {
                        function void main() {
                            var Array a;
                            var int length;
                            var int i, sum;
                        
                        let length = Keyboard.readInt("HOW MANY NUMBERS? ");
                        let a = Array.new(length);
                        let i = 0;
                        
                        while (i < length) {
                            let a[i] = Keyboard.readInt("ENTER THE NEXT NUMBER: ");
                            let i = i + 1;
                        }
                        
                        let i = 0;
                        let sum = 0;
                        
                        while (i < length) {
                            let sum = sum + a[i];
                            let i = i + 1;
                        }
                        
                        do Output.printString("THE AVERAGE IS: ");
                        do Output.printInt(sum / length);
                        do Output.println();
                        
                        return;
                    }
                }
            `),
                "fake.jack"
            );

            expect(await tokeniser.tokenType()).toBe(TokenType.Keyword);
            expect(await tokeniser.keyword()).toBe(Keyword.Class);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Identifier);
            expect(await tokeniser.identifier()).toBe("Main");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.LeftCurlyBracket);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Keyword);
            expect(await tokeniser.keyword()).toBe(Keyword.Function);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Keyword);
            expect(await tokeniser.keyword()).toBe(Keyword.Void);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Identifier);
            expect(await tokeniser.identifier()).toBe("main");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.LeftBracket);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.RightBracket);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.LeftCurlyBracket);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Keyword);
            expect(await tokeniser.keyword()).toBe(Keyword.Var);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Identifier);
            expect(await tokeniser.identifier()).toBe("Array");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Identifier);
            expect(await tokeniser.identifier()).toBe("a");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.Semicolon);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Keyword);
            expect(await tokeniser.keyword()).toBe(Keyword.Var);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Keyword);
            expect(await tokeniser.keyword()).toBe("int");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Identifier);
            expect(await tokeniser.identifier()).toBe("length");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.Semicolon);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Keyword);
            expect(await tokeniser.keyword()).toBe(Keyword.Var);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Keyword);
            expect(await tokeniser.keyword()).toBe(Keyword.Int);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Identifier);
            expect(await tokeniser.identifier()).toBe("i");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.Comma);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Identifier);
            expect(await tokeniser.identifier()).toBe("sum");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.Semicolon);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Keyword);
            expect(await tokeniser.keyword()).toBe(Keyword.Let);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Identifier);
            expect(await tokeniser.identifier()).toBe("length");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.Equal);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Identifier);
            expect(await tokeniser.identifier()).toBe("Keyboard");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.Dot);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Identifier);
            expect(await tokeniser.identifier()).toBe("readInt");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.LeftBracket);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.StringConstant);
            expect(await tokeniser.stringVal()).toBe("HOW MANY NUMBERS? ");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.RightBracket);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.Semicolon);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Keyword);
            expect(await tokeniser.keyword()).toBe(Keyword.Let);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Identifier);
            expect(await tokeniser.identifier()).toBe("a");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.Equal);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Identifier);
            expect(await tokeniser.identifier()).toBe("Array");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.Dot);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Identifier);
            expect(await tokeniser.identifier()).toBe("new");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.LeftBracket);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Identifier);
            expect(await tokeniser.identifier()).toBe("length");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.RightBracket);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.Semicolon);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Keyword);
            expect(await tokeniser.keyword()).toBe(Keyword.Let);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Identifier);
            expect(await tokeniser.identifier()).toBe("i");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.Equal);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.IntegerConstant);
            expect(await tokeniser.intVal()).toBe(0);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.Semicolon);

            // ... etc
        });

        it(`should tokenise this sequence`, async () => {
            const tokeniser = new Tokeniser(
                getChars("let j = j / (-2);"),
                "mock.jack"
            );

            expect(await tokeniser.tokenType()).toBe(TokenType.Keyword);
            expect(await tokeniser.keyword()).toBe(Keyword.Let);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Identifier);
            expect(await tokeniser.identifier()).toBe("j");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.Equal);

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Identifier);
            expect(await tokeniser.identifier()).toBe("j");

            await tokeniser.advance();

            expect(await tokeniser.tokenType()).toBe(TokenType.Symbol);
            expect(await tokeniser.symbol()).toBe(JackSymbol.ForwardSlash);
        });

        async function* getChars(str: string): AsyncGenerator<string> {
            for (const c of str) {
                yield c;
            }
        }
    });
});
