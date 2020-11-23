import { IDENTIFIER } from "./identifier";
import { Syntax, SyntaxType } from "./syntax";

export const VAR_NAME: Syntax = {
    name: "varName",
    type: SyntaxType.ExactlyOne,
    syntax: [IDENTIFIER],
    transparent: true,
};
