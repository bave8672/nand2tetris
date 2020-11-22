import { Token } from "../tokeniser/token";

export enum SyntaxType {
    ExactlyOne,
    Optional,
    Or,
    ZeroOrMore,
}

export interface Syntax {
    name?: string;
    type: SyntaxType;
    syntax: Array<Syntax | Token | (() => Syntax)>;
    transparent?: boolean;
}
