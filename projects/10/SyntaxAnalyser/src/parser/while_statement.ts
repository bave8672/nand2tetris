import { Keyword } from "../tokeniser/keyword";
import { JackSymbol } from "../tokeniser/symbol";
import { EXPRESSION } from "./expression";
import { keyword } from "./keyword";
import { symbol } from "./symbol";
import { Syntax, SyntaxType } from "./syntax";

export const WHILE_STATEMENT: Syntax = {
    name: "whileStatement",
    type: SyntaxType.ExactlyOne,
    syntax: [
        keyword(Keyword.While),
        symbol(JackSymbol.LeftBracket),
        EXPRESSION,
        symbol(JackSymbol.RightBracket),
        symbol(JackSymbol.LeftCurlyBracket),
        /* STATEMENTS */
        symbol(JackSymbol.RightCurlyBracket),
    ],
};
