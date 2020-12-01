import { IDENTIFIER } from "./identifier";
import { SyntaxDef, SyntaxType } from "./syntax";

export const CLASS_NAME: SyntaxDef = {
    name: "className",
    type: SyntaxType.ExactlyOne,
    syntax: [IDENTIFIER],
    transparent: true,
};
