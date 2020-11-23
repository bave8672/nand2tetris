import { JackSymbol } from "../tokeniser/symbol";
import { symbol } from "./symbol";
import { Syntax, SyntaxType } from "./syntax";
import { TYPE } from "./type";
import { VAR_NAME } from "./var_name";
import { zeroOrMore } from "./zero_or_more";

export const PARAMETER_LIST: Syntax = {
    name: "parameterList",
    type: SyntaxType.Optional,
    syntax: [
        TYPE,
        VAR_NAME,
        zeroOrMore(symbol(JackSymbol.Comma), TYPE, VAR_NAME),
    ],
};
