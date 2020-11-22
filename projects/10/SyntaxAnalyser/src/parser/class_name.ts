import { TokenType } from "../tokeniser/token_type";
import { Syntax, SyntaxType } from "./syntax";

export const CLASS_NAME: Syntax = {
    name: "className",
    type: SyntaxType.ExactlyOne,
    syntax: [{ type: TokenType.Identifier, value: "*" }],
    transparent: true,
};
