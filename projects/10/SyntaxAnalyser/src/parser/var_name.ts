import { IDENTIFIER } from "./identifier";
import { SyntaxDef, SyntaxType } from "./syntax";

export const VAR_NAME: SyntaxDef = {
    name: "varName",
    type: SyntaxType.ExactlyOne,
    syntax: [IDENTIFIER],
    transparent: true,
};
