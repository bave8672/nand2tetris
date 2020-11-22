import { JackSymbol } from "../tokeniser/symbol";
import { symbol } from "./symbol";
import { Syntax, SyntaxType } from "./syntax";

export const UNARY_OP: Syntax = {
    name: "unaryOp",
    type: SyntaxType.Or,
    syntax: [symbol(JackSymbol.Minus), symbol(JackSymbol.Tilde)],
    transparent: true,
};
