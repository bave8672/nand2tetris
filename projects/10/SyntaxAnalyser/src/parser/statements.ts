import { STATEMENT } from "./statement";
import { Syntax, SyntaxType } from "./syntax";

export const STATEMENTS: Syntax = {
    name: "statement",
    type: SyntaxType.ZeroOrMore,
    syntax: [STATEMENT],
};
