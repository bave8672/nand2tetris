import { AbstractTokeniserStateMachine } from "./abstract_tokeniser_state_machine";
import { TokenType } from "./token_type";

/**
 * Generic class for matching multiple state machines against an input simultaneously
 * until a match is found
 */
export class EagerHigherOrderTokeniserStateMachine<
    T extends TokenType,
    V
> extends AbstractTokeniserStateMachine<T, V> {
    private readonly childStateMachines: Set<
        AbstractTokeniserStateMachine<T, V>
    >;

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
                if (childStateMachine.tokenType) {
                    return this.setComplete({
                        tokenType: childStateMachine.tokenType,
                        value: childStateMachine.value!,
                        resultIncludesCurrentChar: !!childStateMachine.resultIncludesCurrentChar,
                    });
                } else {
                    this.childStateMachines.delete(childStateMachine);
                    if (this.childStateMachines.size === 0) {
                        return this.setError(childStateMachine.errorMessage);
                    }
                }
            }
        }
    }
}
