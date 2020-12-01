import { TokenType } from "../tokeniser/token_type";
import { SyntaxDef, SyntaxType } from "./syntax";

export const INTEGER_CONSTANT: SyntaxDef = {
    name: "integerConstant",
    type: SyntaxType.ExactlyOne,
    syntax: [{ type: TokenType.IntegerConstant, value: "*" }],
    transparent: true,
};
