import { OP } from "./op";
import { SyntaxDef, SyntaxType } from "./syntax";
import { TERM } from "./term";
import { zeroOrMore } from "./zero_or_more";

export const EXPRESSION: SyntaxDef = {
    name: "expression",
    type: SyntaxType.ExactlyOne,
    syntax: [TERM, zeroOrMore(OP, TERM)],
};
