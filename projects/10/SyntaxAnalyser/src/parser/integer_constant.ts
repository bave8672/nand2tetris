import { TokenType } from "../tokeniser/token_type";
import { Syntax, SyntaxType } from "./syntax";

export const INTEGER_CONSTANT: Syntax = {
    name: "integerConstant",
    type: SyntaxType.ExactlyOne,
    syntax: [{ type: TokenType.IntegerConstant, value: "*" }],
    transparent: true,
};
