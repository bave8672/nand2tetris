import { Syntax, SyntaxType } from "./syntax";

export function zeroOrMore(...syntax: Syntax["syntax"]): Syntax {
    return {
        type: SyntaxType.ZeroOrMore,
        syntax,
    };
}
