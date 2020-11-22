import { AbstractTokeniserStateMachine } from "./abstract_tokeniser_state_machine";
import { TokenType } from "./token_type";

export class IdentifierTokeniserStateMachine extends AbstractTokeniserStateMachine<
    TokenType.Identifier,
    string
> {
    public constructor() {
        super();
    }

    public next(char: string): void {
        if (this.value === undefined && !/^[\w_]$/.test(char)) {
            return this.setError(
                `Expected identifier token to begin with a letter or underscore but received "${char}"`
            );
        } else if (!this.value) {
            this.value = char;
        } else if (this.value && /^[\w\d_]$/.test(char)) {
            this.value += char;
        } else {
            return this.setComplete({
                tokenType: TokenType.Identifier,
                value: this.value!,
                resultIncludesCurrentChar: false,
            });
        }
    }
}
