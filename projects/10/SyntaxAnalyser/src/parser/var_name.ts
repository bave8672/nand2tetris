import { TokenType } from "../tokeniser/token_type";
import { Syntax, SyntaxType } from "./syntax";

export const VAR_NAME: Syntax = {
    name: "varName",
    type: SyntaxType.ExactlyOne,
    syntax: [{ type: TokenType.Identifier, value: "*" }],
    transparent: true,
};
