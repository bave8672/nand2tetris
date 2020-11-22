import { Keyword } from "../tokeniser/keyword";
import { JackSymbol } from "../tokeniser/symbol";
import { EXPRESSION } from "./expression";
import { keyword } from "./keyword";
import { optional } from "./optional";
import { symbol } from "./symbol";
import { Syntax, SyntaxType } from "./syntax";

export const IF_STATEMENT: Syntax = {
    name: "ifStatement",
    type: SyntaxType.ExactlyOne,
    syntax: [
        keyword(Keyword.If),
        symbol(JackSymbol.LeftBracket),
        EXPRESSION,
        symbol(JackSymbol.RightBracket),
        symbol(JackSymbol.LeftCurlyBracket),
        /* STATEMENTS */
        symbol(JackSymbol.RightCurlyBracket),
        optional(
            keyword(Keyword.Else),
            symbol(JackSymbol.LeftCurlyBracket),
            /* STATEMENTS */
            symbol(JackSymbol.RightCurlyBracket)
        ),
    ],
};
