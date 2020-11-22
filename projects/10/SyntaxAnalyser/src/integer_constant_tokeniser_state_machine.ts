import { AbstractTokeniserStateMachine } from "./abstract_tokeniser_state_machine";
import { StringUtil } from "./string_util";
import { TokenType } from "./token_type";

export class IntegerConstantTokeniserStateMachine extends AbstractTokeniserStateMachine<
    TokenType.IntegerConstant,
    number
> {
    private stringValue: string = "";

    public constructor() {
        super();
    }

    public next(char: string): void {
        if (StringUtil.isDigit(char)) {
            this.stringValue += char;
        } else if (this.stringValue) {
            return this.setComplete({
                tokenType: TokenType.IntegerConstant,
                value: Number.parseInt(this.stringValue),
                resultIncludesCurrentChar: false,
            });
        } else {
            return this.setError(
                `Character sequence beginning with ${char} is not an integer constant`
            );
        }
    }
}
