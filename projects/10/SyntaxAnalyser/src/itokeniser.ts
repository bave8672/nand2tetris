import { Keyword } from "./keyword";
import { TokenType } from "./token_type";

export interface ITokeniser {
    hasMoreTokens(): Promise<boolean>;
    advance(): Promise<void>;
    tokenType(): Promise<TokenType>;
    keyword(): Promise<Keyword>;
    symbol(): Promise<string>;
    intVal(): Promise<number>;
    stringVal(): Promise<string>;
}
