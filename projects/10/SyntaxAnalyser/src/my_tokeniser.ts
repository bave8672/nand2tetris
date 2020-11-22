import { ErrorUtil } from "./error_util";
import { JackTokeniserStateMachine } from "./jack_tokeniser_state_machine";
import { LineCount } from "./line_count";
import { Token } from "./token";
import { TokenType } from "./token_type";

/**
 * An alternate intreface for a tokeniser
 * which accepts an iteration of chars
 * and returns a iteration of tokens
 */
export class MyTokeniser {
    public async *parseTokens(
        chars: AsyncIterableIterator<string>,
        path: string
    ): AsyncGenerator<Token> {
        const lineCount = new LineCount(path);
        let stateMachine = new JackTokeniserStateMachine();
        for await (const char of chars) {
            lineCount.next(char);
            stateMachine.next(char);
            while (stateMachine.complete && !stateMachine.errorMessage) {
                if (
                    stateMachine.tokenType &&
                    stateMachine.tokenType !== TokenType.Ignored
                ) {
                    yield {
                        type: stateMachine.tokenType,
                        value: stateMachine.value,
                    };
                }
                const resultIncludesCurrentChar =
                    stateMachine.resultIncludesCurrentChar;
                stateMachine = new JackTokeniserStateMachine();
                if (!resultIncludesCurrentChar) {
                    stateMachine.next(char);
                }
            }
            if (stateMachine.errorMessage) {
                yield {
                    type: TokenType.Error,
                    value: stateMachine.errorMessage,
                };
                ErrorUtil.compilerError(stateMachine.errorMessage, lineCount);
            }
        }
    }
}
