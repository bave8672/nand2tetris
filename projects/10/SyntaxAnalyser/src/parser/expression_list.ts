import { JackSymbol } from "../tokeniser/symbol";
import { EXPRESSION } from "./expression";
import { symbol } from "./symbol";
import { Syntax, SyntaxType } from "./syntax";

export const EXPRESSION_LIST: Syntax = {
    name: "expressionList",
    type: SyntaxType.Optional,
    syntax: [
        EXPRESSION,
        {
            type: SyntaxType.ZeroOrMore,
            syntax: [symbol(JackSymbol.Comma), EXPRESSION],
        },
    ],
};
