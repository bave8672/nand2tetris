import { Keyword } from "../tokeniser/keyword";
import { JackSymbol } from "../tokeniser/symbol";
import { EXPRESSION } from "./expression";
import { keyword } from "./keyword";
import { optional } from "./optional";
import { symbol } from "./symbol";
import { Syntax, SyntaxType } from "./syntax";
import { VAR_NAME } from "./var_name";

export const LET_STATEMENT: Syntax = {
    name: "letStatement",
    type: SyntaxType.ExactlyOne,
    syntax: [
        keyword(Keyword.Let),
        VAR_NAME,
        optional(
            symbol(JackSymbol.LeftSquareBracket),
            EXPRESSION,
            symbol(JackSymbol.RightBracket)
        ),
        symbol(JackSymbol.Equal),
        EXPRESSION,
        symbol(JackSymbol.Semicolon),
    ],
};
