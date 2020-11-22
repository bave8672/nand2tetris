import { Syntax, SyntaxType } from "./syntax";

export function optional(...syntax: Syntax["syntax"]): Syntax {
    return {
        type: SyntaxType.Optional,
        syntax,
    };
}
