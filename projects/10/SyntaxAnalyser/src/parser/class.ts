import { Keyword } from "../tokeniser/keyword";
import { JackSymbol } from "../tokeniser/symbol";
import { CLASS_NAME } from "./class_name";
import { CLASS_VAR_DEC } from "./class_var_dec";
import { keyword } from "./keyword";
import { SUBROUTINE_DEC } from "./subroutine_dec";
import { symbol } from "./symbol";
import { SyntaxDef, SyntaxType } from "./syntax";
import { zeroOrMore } from "./zero_or_more";

export const CLASS: SyntaxDef = {
    name: "class",
    type: SyntaxType.ExactlyOne,
    syntax: [
        keyword(Keyword.Class),
        CLASS_NAME,
        symbol(JackSymbol.LeftCurlyBracket),
        zeroOrMore(CLASS_VAR_DEC),
        zeroOrMore(SUBROUTINE_DEC),
        symbol(JackSymbol.RightCurlyBracket),
    ],
};
