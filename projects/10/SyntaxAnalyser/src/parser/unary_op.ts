import { JackSymbol } from "../tokeniser/symbol";
import { symbol } from "./symbol";
import { SyntaxDef, SyntaxType } from "./syntax";

export const UNARY_OP: SyntaxDef = {
    name: "unaryOp",
    type: SyntaxType.Or,
    syntax: [symbol(JackSymbol.Minus), symbol(JackSymbol.Tilde)],
    transparent: true,
};
