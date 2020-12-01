import { STATEMENT } from "./statement";
import { SyntaxDef, SyntaxType } from "./syntax";

export const STATEMENTS: SyntaxDef = {
    name: "statement",
    type: SyntaxType.ZeroOrMore,
    syntax: [STATEMENT],
};
