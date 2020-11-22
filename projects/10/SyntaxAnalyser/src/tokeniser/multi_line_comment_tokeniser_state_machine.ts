import { AbstractTokeniserStateMachine } from "./abstract_tokeniser_state_machine";
import { TokenType } from "./token_type";

export class MultiLineCommentTokeniserStateMachine extends AbstractTokeniserStateMachine<
    TokenType.Ignored,
    string
> {
    private index = -1;
    private prevCharIsStar: boolean = false;

    public next(char: string) {
        this.index++;
        if (this.index === 0 && char !== "/") {
            return this.setError(
                `A multi line comment must begin with a slash - received "${char}"`
            );
        } else if (this.index === 1 && char !== "*") {
            return this.setError(
                `A multi line comment must follow the initial slash with a star - received "${char}"`
            );
        } else if (this.index >= 2 && char === "/" && this.prevCharIsStar) {
            return this.setComplete({
                tokenType: TokenType.Ignored,
                value: "multiLineComment",
                resultIncludesCurrentChar: true,
            });
        } else if (this.index >= 2) {
            this.prevCharIsStar = char === "*";
        }
    }
}
