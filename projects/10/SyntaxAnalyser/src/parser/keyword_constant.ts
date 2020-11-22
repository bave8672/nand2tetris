import { Keyword } from "../tokeniser/keyword";
import { TokenType } from "../tokeniser/token_type";
import { Syntax, SyntaxType } from "./syntax";

export const KEYWORD_CONSTANT: Syntax = {
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
