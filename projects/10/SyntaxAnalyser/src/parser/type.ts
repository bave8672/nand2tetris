import { Keyword } from "../tokeniser/keyword";
import { CLASS_NAME } from "./class_name";
import { keyword } from "./keyword";
import { SyntaxDef, SyntaxType } from "./syntax";

export const TYPE: SyntaxDef = {
    name: "type",
    type: SyntaxType.Or,
    syntax: [
        keyword(Keyword.Int),
        keyword(Keyword.Char),
        keyword(Keyword.Boolean),
        CLASS_NAME,
    ],
    transparent: true,
};
