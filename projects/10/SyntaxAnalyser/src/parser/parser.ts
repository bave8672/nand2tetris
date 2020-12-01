import { Token } from "../tokeniser/token";
import { Syntax, SyntaxDef } from "./syntax";

export class Parser {
    public async *parseTokens(
        tokens: AsyncIterableIterator<Token>,
        syntaxDef: SyntaxDef
    ): AsyncGenerator<Syntax> {}
}
