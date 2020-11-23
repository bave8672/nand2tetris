import { Keyword } from "../tokeniser/keyword";
import { keyword } from "./keyword";
import { Syntax, SyntaxType } from "./syntax";
import { TYPE } from "./type";

export const VAR_DEC: Syntax = {
    name: "varDec",
    type: SyntaxType.ExactlyOne,
    syntax: [keyword(Keyword.Var), TYPE],
    transparent: true,
};
