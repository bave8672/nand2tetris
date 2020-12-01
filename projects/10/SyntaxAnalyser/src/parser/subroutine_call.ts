import { JackSymbol } from "../tokeniser/symbol";
import { CLASS_NAME } from "./class_name";
import { EXPRESSION_LIST } from "./expression_list";
import { optional } from "./optional";
import { or } from "./or";
import { SUBROUTINE_NAME } from "./subroutine_name";
import { symbol } from "./symbol";
import { SyntaxDef, SyntaxType } from "./syntax";
import { VAR_NAME } from "./var_name";

export const SUBROUTINE_CALL: SyntaxDef = {
    name: "expressionList",
    type: SyntaxType.ExactlyOne,
    syntax: [
        optional(or(CLASS_NAME, VAR_NAME), symbol(JackSymbol.Dot)),
        SUBROUTINE_NAME,
        symbol(JackSymbol.LeftBracket),
        EXPRESSION_LIST,
        symbol(JackSymbol.LeftBracket),
    ],
};
