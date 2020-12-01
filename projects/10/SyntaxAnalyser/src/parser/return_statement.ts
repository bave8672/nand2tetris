import { Keyword } from "../tokeniser/keyword";
import { JackSymbol } from "../tokeniser/symbol";
import { EXPRESSION } from "./expression";
import { keyword } from "./keyword";
import { optional } from "./optional";
import { symbol } from "./symbol";
import { SyntaxDef, SyntaxType } from "./syntax";

export const RETURN_STATEMENT: SyntaxDef = {
    name: "returnStatement",
    type: SyntaxType.ExactlyOne,
    syntax: [
        keyword(Keyword.Return),
        optional(EXPRESSION),
        symbol(JackSymbol.Semicolon),
    ],
};
