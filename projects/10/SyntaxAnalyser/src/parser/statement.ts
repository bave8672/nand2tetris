import { DO_STATEMENT } from "./do_statement";
import { IF_STATEMENT } from "./if_statement";
import { LET_STATEMENT } from "./let_statement";
import { RETURN_STATEMENT } from "./return_statement";
import { SyntaxDef, SyntaxType } from "./syntax";
import { WHILE_STATEMENT } from "./while_statement";

export const STATEMENT: SyntaxDef = {
    name: "statement",
    type: SyntaxType.Or,
    syntax: [
        LET_STATEMENT,
        IF_STATEMENT,
        WHILE_STATEMENT,
        DO_STATEMENT,
        RETURN_STATEMENT,
    ],
    transparent: true,
};
