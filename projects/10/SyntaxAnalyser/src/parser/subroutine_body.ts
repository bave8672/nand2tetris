import { JackSymbol } from "../tokeniser/symbol";
import { STATEMENTS } from "./statements";
import { symbol } from "./symbol";
import { Syntax, SyntaxType } from "./syntax";
import { VAR_DEC } from "./var_dec";
import { zeroOrMore } from "./zero_or_more";

export const SUBROUTINE_BODY: Syntax = {
    name: "subroutineBody",
    type: SyntaxType.ExactlyOne,
    syntax: [
        symbol(JackSymbol.LeftCurlyBracket),
        zeroOrMore(VAR_DEC),
        STATEMENTS,
        symbol(JackSymbol.RightCurlyBracket),
    ],
};
