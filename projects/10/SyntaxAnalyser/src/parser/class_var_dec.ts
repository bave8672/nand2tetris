import { Keyword } from "../tokeniser/keyword";
import { JackSymbol } from "../tokeniser/symbol";
import { keyword } from "./keyword";
import { or } from "./or";
import { symbol } from "./symbol";
import { SyntaxDef, SyntaxType } from "./syntax";
import { TYPE } from "./type";
import { VAR_NAME } from "./var_name";
import { zeroOrMore } from "./zero_or_more";

export const CLASS_VAR_DEC: SyntaxDef = {
    name: "classVarDec",
    type: SyntaxType.ExactlyOne,
    syntax: [
        or(keyword(Keyword.Static), keyword(Keyword.Field)),
        TYPE,
        VAR_NAME,
        zeroOrMore(symbol(JackSymbol.Comma), VAR_NAME),
        symbol(JackSymbol.Semicolon),
    ],
};
