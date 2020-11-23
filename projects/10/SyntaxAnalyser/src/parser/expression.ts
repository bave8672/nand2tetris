import { OP } from "./op";
import { Syntax, SyntaxType } from "./syntax";
import { TERM } from "./term";
import { zeroOrMore } from "./zero_or_more";

export const EXPRESSION: Syntax = {
    name: "expression",
    type: SyntaxType.ExactlyOne,
    syntax: [TERM, zeroOrMore(OP, TERM)],
};
