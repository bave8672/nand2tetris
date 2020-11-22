import { Keyword } from "../tokeniser/keyword";
import { JackSymbol } from "../tokeniser/symbol";
import { keyword } from "./keyword";
import { SUBROUTINE_CALL } from "./subroutine_call";
import { symbol } from "./symbol";
import { Syntax, SyntaxType } from "./syntax";

export const DO_STATEMENT: Syntax = {
    name: "doStatement",
    type: SyntaxType.ExactlyOne,
    syntax: [
        keyword(Keyword.Do),
        SUBROUTINE_CALL,
        symbol(JackSymbol.Semicolon),
    ],
};
