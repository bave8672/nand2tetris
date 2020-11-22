import { AbstractTokeniserStateMachine } from "./abstract_tokeniser_state_machine";
import { TokenType } from "./token_type";

export class ExactMatchTokeniserStateMachine<
    T extends TokenType,
    V extends string
> extends AbstractTokeniserStateMachine<T, V> {
    private charIndex: number = -1;

    constructor(
        private readonly options: {
            readonly tokenType: T;
            readonly valueToMatch: V;
        }
    ) {
        super();
        if (!this.options.valueToMatch) {
            throw new Error(`Cannot match empty string`);
        }
    }

    public next(char: string) {
        this.charIndex++;
        const expectedChar = this.options.valueToMatch[this.charIndex];
        if (char !== expectedChar) {
            this.setError(
                `Error matching exact value ${this.options.valueToMatch} at index ${this.charIndex}: expected ${expectedChar}, received "${char}"`
            );
        } else if (this.charIndex === this.options.valueToMatch.length - 1) {
            this.setComplete({
                tokenType: this.options.tokenType,
                value: this.options.valueToMatch,
                resultIncludesCurrentChar: true,
            });
        }
    }
}
