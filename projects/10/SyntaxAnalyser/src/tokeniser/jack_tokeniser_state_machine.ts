import { EagerHigherOrderTokeniserStateMachine } from "./eager_higher_order_tokeniser_state_machine";
import { IdentifierTokeniserStateMachine } from "./identifier_tokeniser_state_machine";
import { IntegerConstantTokeniserStateMachine } from "./integer_constant_tokeniser_state_machine";
import { KeywordTokeniserStateMachine } from "./keyword_tokeniser_state_machine";
import { LazyHigherOrderTokeniserStateMachine } from "./lazy_higher_order_tokeniser_state_machine";
import { LineCommentTokeniserStateMachine } from "./line_comment_tokeniser_state_machine";
import { MultiLineCommentTokeniserStateMachine } from "./multi_line_comment_tokeniser_state_machine";
import { StringConstantTokeniserStateMachine } from "./string_constant_tokeniser_state_machine";
import { SymbolTokeniserStateMachine } from "./symbol_tokeniser_state_machine";
import { TokenType } from "./token_type";
import { WhitespaceAgnosticTokeniserStateMachine } from "./whitespace_agnostic_tokeniser_state_machine";

export class JackTokeniserStateMachine extends WhitespaceAgnosticTokeniserStateMachine<
    TokenType,
    any
> {
    public constructor() {
        super(
            new LazyHigherOrderTokeniserStateMachine(
                new EagerHigherOrderTokeniserStateMachine(
                    new LineCommentTokeniserStateMachine(),
                    new MultiLineCommentTokeniserStateMachine()
                ),
                new EagerHigherOrderTokeniserStateMachine<TokenType, any>(
                    new KeywordTokeniserStateMachine(),
                    new SymbolTokeniserStateMachine(),
                    new IntegerConstantTokeniserStateMachine(),
                    new StringConstantTokeniserStateMachine(),
                    new IdentifierTokeniserStateMachine()
                )
            )
        );
    }
}
