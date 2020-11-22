import { EagerHigherOrderTokeniserStateMachine } from "./eager_higher_order_tokeniser_state_machine";
import { ExactMatchTokeniserStateMachine } from "./exact_match_tokeniser_state_machine";
import { TokenType } from "./token_type";

export class EnumTokeniserStateMachine<
    T extends TokenType,
    V extends string
> extends EagerHigherOrderTokeniserStateMachine<T, V> {
    constructor(tokenType: T, values: Record<string, V>) {
        super(
            ...Object.values(values).map(
                (valueToMatch) =>
                    new ExactMatchTokeniserStateMachine<T, V>({
                        tokenType,
                        valueToMatch,
                    })
            )
        );
    }
}
