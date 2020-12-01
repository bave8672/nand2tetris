import { Token } from "../tokeniser/token";

export enum SyntaxType {
    ExactlyOne,
    Optional,
    Or,
    ZeroOrMore,
}

export type SyntaxDefObj = {
    name?: string;
    type: SyntaxType;
    syntax: Array<SyntaxDef>;
    transparent?: boolean;
};

export type SyntaxDef = Token | SyntaxDefObj | (() => SyntaxDef);

export type SyntaxObj = { type: string; children: Syntax[] };
export type Syntax = Token | SyntaxObj;

export function isToken(syntaxDef: SyntaxDef): syntaxDef is Token {
    return !(syntaxDef as SyntaxDefObj).syntax;
}

export function isSyntax(syntaxDef: SyntaxDef): syntaxDef is SyntaxDefObj {
    return !!(syntaxDef as SyntaxDefObj).syntax;
}

export function isSyntaxObj(syntax: Syntax): syntax is SyntaxObj {
    return !!(syntax as SyntaxObj).children;
}

export function pushSyntax(syntax: Syntax[], ...elems: Syntax[]) {
    for (const el of elems) {
        if (isSyntaxObj(el) && !el.type) {
            pushSyntax(syntax, ...el.children);
        } else {
            syntax.push(el);
        }
    }
}
