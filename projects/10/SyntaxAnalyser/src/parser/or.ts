import { SyntaxDef, SyntaxType } from "./syntax";

export function or(...syntax: SyntaxDef[]): SyntaxDef {
    return {
        type: SyntaxType.Or,
        syntax,
    };
}
