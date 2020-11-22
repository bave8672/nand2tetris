import { TokenType } from "./token_type";

export interface Token {
    type: TokenType;
    value: string | number;
}
