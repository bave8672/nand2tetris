import { Keyword } from "../tokeniser/keyword";
import { JackSymbol } from "../tokeniser/symbol";
import { keyword } from "./keyword";
import { or } from "./or";
import { PARAMETER_LIST } from "./parameter_list";
import { SUBROUTINE_NAME } from "./subroutine_name";
import { symbol } from "./symbol";
import { Syntax, SyntaxType } from "./syntax";
import { TYPE } from "./type";

export const SUBROUTINE_DEC: Syntax = {
    name: "subroutineDec",
    type: SyntaxType.ExactlyOne,
    syntax: [
        or(
            keyword(Keyword.Constructor),
            keyword(Keyword.Function),
            keyword(Keyword.Method)
        ),
        or(keyword(Keyword.Void), TYPE),
        SUBROUTINE_NAME,
        symbol(JackSymbol.LeftBracket),
        PARAMETER_LIST,
        symbol(JackSymbol.RightBracket),
    ],
};
