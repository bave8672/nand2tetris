import { Keyword } from "../tokeniser/keyword";
import { JackSymbol } from "../tokeniser/symbol";
import { EXPRESSION } from "./expression";
import { keyword } from "./keyword";
import { optional } from "./optional";
import { symbol } from "./symbol";
import { Syntax, SyntaxType } from "./syntax";

export const RETURN_STATEMENT: Syntax = {
    name: "returnStatement",
    type: SyntaxType.ExactlyOne,
    syntax: [
        keyword(Keyword.Return),
        optional(EXPRESSION),
        symbol(JackSymbol.Semicolon),
    ],
};
