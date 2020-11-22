import { Keyword } from "../tokeniser/keyword";
import { Token } from "../tokeniser/token";
import { TokenType } from "../tokeniser/token_type";

export function keyword(value: Keyword): Token {
    return {
        type: TokenType.Keyword,
        value,
    };
}
