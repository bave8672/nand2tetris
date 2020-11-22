import { JackSymbol } from "../tokeniser/symbol";
import { CLASS_NAME } from "./class_name";
import { EXPRESSION_LIST } from "./expression_list";
import { optional } from "./optional";
import { SUBROUTINE_NAME } from "./subroutine_name";
import { symbol } from "./symbol";
import { Syntax, SyntaxType } from "./syntax";
import { VAR_NAME } from "./var_name";

export const SUBROUTINE_CALL: Syntax = {
    name: "expressionList",
    type: SyntaxType.ExactlyOne,
    syntax: [
        optional(
            { type: SyntaxType.Or, syntax: [CLASS_NAME, VAR_NAME] },
            symbol(JackSymbol.Dot)
        ),
        SUBROUTINE_NAME,
        symbol(JackSymbol.LeftBracket),
        EXPRESSION_LIST,
        symbol(JackSymbol.LeftBracket),
    ],
};
