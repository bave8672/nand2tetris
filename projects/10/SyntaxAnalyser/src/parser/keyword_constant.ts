import { Keyword } from "../tokeniser/keyword";
import { TokenType } from "../tokeniser/token_type";
import { SyntaxDef, SyntaxType } from "./syntax";

export const KEYWORD_CONSTANT: SyntaxDef = {
    name: "keywordConstant",
    type: SyntaxType.Or,
    syntax: [
        { type: TokenType.Keyword, value: Keyword.True },
        { type: TokenType.Keyword, value: Keyword.False },
        { type: TokenType.Keyword, value: Keyword.Null },
        { type: TokenType.Keyword, value: Keyword.This },
    ],
    transparent: true,
};
