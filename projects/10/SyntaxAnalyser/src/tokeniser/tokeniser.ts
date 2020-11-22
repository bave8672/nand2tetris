import assert from "assert";
import { ITokeniser } from "./itokeniser";
import { Keyword } from "./keyword";
import { MyTokeniser } from "./my_tokeniser";
import { Token } from "./token";
import { TokenType } from "./token_type";

/**
 * An implementation of the tokeniser interface described in nand2tetris
 */
export class Tokeniser implements ITokeniser {
    private readonly tokenGenerator = new MyTokeniser().parseTokens(
        this.chars,
        this.path
    );
    private _currentTokenResult?: IteratorResult<Token, void>;

    public constructor(
        private readonly chars: AsyncIterableIterator<string>,
        private readonly path: string
    ) {}

    public async hasMoreTokens(): Promise<boolean> {
        return !(this._currentTokenResult && this._currentTokenResult.done);
    }

    public async advance(): Promise<void> {
        this._currentTokenResult = await this.tokenGenerator.next();
    }

    public async tokenType(): Promise<TokenType> {
        const token = await this.getCurrentToken();
        return token.type;
    }

    public async keyword(): Promise<Keyword> {
        return ((await this.assertTokenType(
            TokenType.Keyword,
            "string"
        )) as unknown) as Promise<Keyword>;
    }

    public async symbol(): Promise<string> {
        return await this.assertTokenType(TokenType.Symbol, "string");
    }

    public async identifier(): Promise<string> {
        return await this.assertTokenType(TokenType.Identifier, "string");
    }

    public async intVal(): Promise<number> {
        return await this.assertTokenType(TokenType.IntegerConstant, "number");
    }

    public async stringVal(): Promise<string> {
        return await this.assertTokenType(TokenType.StringConstant, "string");
    }

    private async assertTokenType(
        tokenType: TokenType,
        valueType: "string"
    ): Promise<string>;
    private async assertTokenType(
        tokenType: TokenType,
        valueType: "number"
    ): Promise<number>;
    private async assertTokenType<T extends string | number>(
        tokenType: TokenType,
        valueType: string
    ): Promise<T> {
        const token = await this.getCurrentToken();
        assert.strictEqual(
            token.type,
            tokenType,
            `Cannot get ${tokenType} value for actual token type ${token.type}`
        );
        assert.strictEqual(
            typeof token.value,
            valueType,
            `Expected ${tokenType} token to have value type ${valueType}, received "${typeof token.value}"`
        );
        return token.value as T;
    }

    private async getCurrentToken(): Promise<Token> {
        if (!this._currentTokenResult) {
            await this.advance();
        }
        assert(
            this._currentTokenResult,
            `No token set after calling advance()`
        );
        assert.strictEqual(
            this._currentTokenResult.done,
            false,
            `Cannot get token type after end of tokens`
        );
        return this._currentTokenResult.value as any;
    }
}
