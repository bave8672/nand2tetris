import { IDENTIFIER } from "./identifier";
import { Syntax, SyntaxType } from "./syntax";

export const SUBROUTINE_NAME: Syntax = {
    name: "subroutineName",
    type: SyntaxType.ExactlyOne,
    syntax: [IDENTIFIER],
    transparent: true,
};
