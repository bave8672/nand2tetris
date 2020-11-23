import { Token } from "../tokeniser/token";
import { TokenType } from "../tokeniser/token_type";

export const IDENTIFIER: Token = {
    type: TokenType.Identifier,
    value: "*", // can be any
};
