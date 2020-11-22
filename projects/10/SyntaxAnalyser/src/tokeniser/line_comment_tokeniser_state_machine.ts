import { AbstractTokeniserStateMachine } from "./abstract_tokeniser_state_machine";
import { TokenType } from "./token_type";

export class LineCommentTokeniserStateMachine extends AbstractTokeniserStateMachine<
    TokenType.Ignored,
    string
> {
    private index = -1;

    public next(char: string) {
        this.index++;
        if (this.index < 2) {
            if (char === "/") {
                return;
            } else {
                return this.setError(
                    `A line comment must begin with two slashes - received "${char}" at index ${this.index}`
                );
            }
        } else if (char === "\n") {
            return this.setComplete({
                tokenType: TokenType.Ignored,
                value: "lineComment",
                resultIncludesCurrentChar: true,
            });
        }
    }
}
