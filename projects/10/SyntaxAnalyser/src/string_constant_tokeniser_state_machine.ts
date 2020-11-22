import { AbstractTokeniserStateMachine } from "./abstract_tokeniser_state_machine";
import { TokenType } from "./token_type";

export class StringConstantTokeniserStateMachine extends AbstractTokeniserStateMachine<
    TokenType.StringConstant,
    string
> {
    public constructor() {
        super();
    }

    public next(char: string): void {
        if (char === `"` && this.value === undefined) {
            this.value = "";
            return;
        } else if (char !== `"` && this.value === undefined) {
            return this.setError(
                `Character sequence beginning with ${char} is not a string constant`
            );
        } else if (char === `\n` && this.value !== undefined) {
            return this.setError(
                `Character sequence beginning with ${this.value} cannot contain a newline`
            );
        } else if (char === `"` && this.value !== undefined) {
            return this.setComplete({
                tokenType: TokenType.StringConstant,
                value: this.value,
                resultIncludesCurrentChar: true,
            });
        } else {
            this.value += char;
        }
    }
}
