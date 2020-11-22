import { AbstractTokeniserStateMachine } from "./abstract_tokeniser_state_machine";
import { TokenType } from "./token_type";

/**
 * Generic class for matching multiple state machines against an input simultaneously
 * until a match is found
 */
export class LazyHigherOrderTokeniserStateMachine<
    T extends TokenType,
    V
> extends AbstractTokeniserStateMachine<T, V> {
    private readonly childStateMachines: Set<
        AbstractTokeniserStateMachine<T, V>
    >;
    private successfulState: AbstractTokeniserStateMachine<T, V> | undefined;

    public constructor(
        ...tokeniserStateMachines: Array<AbstractTokeniserStateMachine<T, V>>
    ) {
        super();
        this.childStateMachines = new Set(tokeniserStateMachines);
    }

    public next(char: string) {
        for (const childStateMachine of this.childStateMachines) {
            childStateMachine.next(char);
            if (childStateMachine.complete) {
                this.childStateMachines.delete(childStateMachine);
                if (
                    childStateMachine.tokenType &&
                    !childStateMachine.errorMessage
                ) {
                    this.successfulState = childStateMachine;
                } else {
                    this.errorMessage = childStateMachine.errorMessage;
                }
            }
        }
        if (this.childStateMachines.size === 0) {
            if (this.successfulState) {
                return this.setComplete({
                    tokenType: this.successfulState.tokenType!,
                    value: this.successfulState.value!,
                    resultIncludesCurrentChar: !!this.successfulState
                        .resultIncludesCurrentChar,
                });
            } else {
                return this.setError(this.errorMessage);
            }
        }
    }
}
