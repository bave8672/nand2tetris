import { SyntaxDef, SyntaxType } from "./syntax";

export function zeroOrMore(...syntax: Array<SyntaxDef>): SyntaxDef {
    return {
        type: SyntaxType.ZeroOrMore,
        syntax,
    };
}
