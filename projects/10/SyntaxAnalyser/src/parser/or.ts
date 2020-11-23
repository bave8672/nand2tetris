import { Syntax, SyntaxType } from "./syntax";

export function or(...syntax: Syntax["syntax"]): Syntax {
    return {
        type: SyntaxType.Or,
        syntax,
    };
}
