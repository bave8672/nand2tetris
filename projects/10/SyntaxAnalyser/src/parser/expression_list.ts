import { JackSymbol } from "../tokeniser/symbol";
import { EXPRESSION } from "./expression";
import { symbol } from "./symbol";
import { Syntax, SyntaxType } from "./syntax";
import { zeroOrMore } from "./zero_or_more";

export const EXPRESSION_LIST: Syntax = {
    name: "expressionList",
    type: SyntaxType.Optional,
    syntax: [EXPRESSION, zeroOrMore(symbol(JackSymbol.Comma), EXPRESSION)],
};
