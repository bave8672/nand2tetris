import { OP } from "./op";
import { Syntax, SyntaxType } from "./syntax";
import { TERM } from "./term";

export const EXPRESSION: Syntax = {
    name: "expression",
    type: SyntaxType.ExactlyOne,
    syntax: [
        TERM,
        {
            type: SyntaxType.ZeroOrMore,
            syntax: [OP, TERM],
        },
    ],
};
