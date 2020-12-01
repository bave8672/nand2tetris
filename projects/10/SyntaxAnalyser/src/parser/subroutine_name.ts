import { IDENTIFIER } from "./identifier";
import { SyntaxDef, SyntaxType } from "./syntax";

export const SUBROUTINE_NAME: SyntaxDef = {
    name: "subroutineName",
    type: SyntaxType.ExactlyOne,
    syntax: [IDENTIFIER],
    transparent: true,
};
