import { IDENTIFIER } from "./identifier";
import { Syntax, SyntaxType } from "./syntax";

export const CLASS_NAME: Syntax = {
    name: "className",
    type: SyntaxType.ExactlyOne,
    syntax: [IDENTIFIER],
    transparent: true,
};
