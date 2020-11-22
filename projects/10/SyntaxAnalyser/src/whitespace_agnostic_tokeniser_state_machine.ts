import { AbstractTokeniserStateMachine } from "./abstract_tokeniser_state_machine";
import { EagerHigherOrderTokeniserStateMachine } from "./eager_higher_order_tokeniser_state_machine";
import { StringUtil } from "./string_util";
import { TokenType } from "./token_type";

export class WhitespaceAgnosticTokeniserStateMachine<
    T extends TokenType,
    V
> extends EagerHigherOrderTokeniserStateMachine<T, V> {
    private hasBegunProcessingNonWhitespaceChars: boolean = false;

    constructor(
        ...tokeniserStateMachines: Array<AbstractTokeniserStateMachine<T, V>>
    ) {
        super(...tokeniserStateMachines);
    }

    public next(char: string): void {
        if (
            !this.hasBegunProcessingNonWhitespaceChars &&
            StringUtil.isWhitespace(char)
        ) {
            return;
        } else {
            this.hasBegunProcessingNonWhitespaceChars = true;
            return super.next(char);
        }
    }
}
