import { Keyword } from "../tokeniser/keyword";
import { keyword } from "./keyword";
import { SyntaxDef, SyntaxType } from "./syntax";
import { TYPE } from "./type";

export const VAR_DEC: SyntaxDef = {
    name: "varDec",
    type: SyntaxType.ExactlyOne,
    syntax: [keyword(Keyword.Var), TYPE],
    transparent: true,
};
