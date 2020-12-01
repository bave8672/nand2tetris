import { SyntaxDef, SyntaxType } from "./syntax";

export function optional(...syntax: SyntaxDef[]): SyntaxDef {
    return {
        type: SyntaxType.Optional,
        syntax,
    };
}
