import { JackSymbol } from "../tokeniser/symbol";
import { Token } from "../tokeniser/token";
import { TokenType } from "../tokeniser/token_type";

export function symbol(value: JackSymbol): Token {
    return {
        type: TokenType.Symbol,
        value,
    };
}
