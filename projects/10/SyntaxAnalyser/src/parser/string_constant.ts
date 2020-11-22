import { TokenType } from "../tokeniser/token_type";
import { Syntax, SyntaxType } from "./syntax";

export const STRING_CONSTANT: Syntax = {
    name: "stringConstant",
    type: SyntaxType.ExactlyOne,
    syntax: [{ type: TokenType.StringConstant, value: "*" }],
    transparent: true,
};
