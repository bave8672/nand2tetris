import { JackSymbol } from "../tokeniser/symbol";
import { symbol } from "./symbol";
import { SyntaxDef, SyntaxType } from "./syntax";

export const OP: SyntaxDef = {
    name: "op",
    type: SyntaxType.Or,
    syntax: [
        symbol(JackSymbol.Plus),
        symbol(JackSymbol.Minus),
        symbol(JackSymbol.Star),
        symbol(JackSymbol.ForwardSlash),
        symbol(JackSymbol.Star),
        symbol(JackSymbol.Ampersand),
        symbol(JackSymbol.VerticalBar),
        symbol(JackSymbol.LessThan),
        symbol(JackSymbol.GreaterThan),
        symbol(JackSymbol.Equal),
    ],
    transparent: true,
};
