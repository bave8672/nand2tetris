import { TokenType } from "../tokeniser/token_type";
import { SyntaxDef, SyntaxType } from "./syntax";

export const STRING_CONSTANT: SyntaxDef = {
    name: "stringConstant",
    type: SyntaxType.ExactlyOne,
    syntax: [{ type: TokenType.StringConstant, value: "*" }],
    transparent: true,
};
