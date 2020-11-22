import { TokenType } from "../tokeniser/token_type";
import { Syntax, SyntaxType } from "./syntax";

export const SUBROUTINE_NAME: Syntax = {
    name: "subroutineName",
    type: SyntaxType.ExactlyOne,
    syntax: [{ type: TokenType.Identifier, value: "*" }],
    transparent: true,
};
