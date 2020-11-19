import { ITokeniser } from "./itokeniser";
import { Keyword } from "./keyword";
import { TokenType } from "./token_type";

export class Tokeniser implements ITokeniser {
    public constructor(private readonly input: AsyncIterator<string>) {}

    public async hasMoreTokens(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async advance(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async tokenType(): Promise<TokenType> {
        throw new Error("Method not implemented.");
    }

    public async keyword(): Promise<Keyword> {
        throw new Error("Method not implemented.");
    }

    public async symbol(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public async intVal(): Promise<number> {
        throw new Error("Method not implemented.");
    }
}
