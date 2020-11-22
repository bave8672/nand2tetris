import { JackSymbol } from "../tokeniser/symbol";
import { EXPRESSION } from "./expression";
import { INTEGER_CONSTANT } from "./integer_constant";
import { KEYWORD_CONSTANT } from "./keyword_constant";
import { STRING_CONSTANT } from "./string_constant";
import { SUBROUTINE_CALL } from "./subroutine_call";
import { symbol } from "./symbol";
import { Syntax, SyntaxType } from "./syntax";
import { UNARY_OP } from "./unary_op";
import { VAR_NAME } from "./var_name";

export const TERM: Syntax = {
    name: "term",
    type: SyntaxType.Or,
    syntax: [
        INTEGER_CONSTANT,
        STRING_CONSTANT,
        KEYWORD_CONSTANT,
        VAR_NAME,
        {
            type: SyntaxType.ExactlyOne,
            syntax: [
                VAR_NAME,
                symbol(JackSymbol.LeftSquareBracket),
                EXPRESSION,
                symbol(JackSymbol.RightSquareBracket),
            ],
        },
        SUBROUTINE_CALL,
        {
            type: SyntaxType.ExactlyOne,
            syntax: [
                symbol(JackSymbol.LeftBracket),
                EXPRESSION,
                symbol(JackSymbol.RightBracket),
            ],
        },
        {
            type: SyntaxType.ExactlyOne,
            syntax: [UNARY_OP, () => TERM],
        },
    ],
};
