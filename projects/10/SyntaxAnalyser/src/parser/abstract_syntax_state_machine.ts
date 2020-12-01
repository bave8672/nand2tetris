import { assert } from "console";
import { AbstractStateMachine } from "../common/abstract_state_machine";
import { Token } from "../tokeniser/token";
import { TokenType } from "../tokeniser/token_type";
import {
    isSyntax,
    pushSyntax,
    Syntax,
    SyntaxDef,
    SyntaxDefObj,
    SyntaxType,
} from "./syntax";

export class SyntaxStateMachine extends AbstractStateMachine<Token, Syntax> {
    private syntaxDef: Token | SyntaxDefObj;
    private childStateMachines: SyntaxStateMachine[];
    private childSyntaxBuffer: Syntax[] = [];
    private childSyntax: Syntax[] = [];
    private hasBegunMatchingOptional = false;

    public complete: boolean = false;
    public errorMessage?: string;

    public constructor(syntaxDef: SyntaxDef) {
        super();
        while (typeof syntaxDef === "function") {
            syntaxDef = syntaxDef();
        }
        this.syntaxDef = syntaxDef;
        this.childStateMachines = isSyntax(this.syntaxDef)
            ? this.syntaxDef.syntax.map((s) => new SyntaxStateMachine(s))
            : [];
    }

    public next(token: Token): void {
        if (this.complete) {
            throw new Error(
                `Cannot call next() on complete matcher ${JSON.stringify(
                    this.syntaxDef
                )}`
            );
        }
        switch (this.syntaxDef.type) {
            case TokenType.Symbol:
            case TokenType.Keyword:
                return this.assertTokenMatchTypeAndValue(token, this.syntaxDef);
            case TokenType.Identifier:
            case TokenType.IntegerConstant:
            case TokenType.StringConstant:
                return this.assertTokenMatchTypeOnly(
                    token,
                    this.syntaxDef.type
                );
            case SyntaxType.ExactlyOne:
                return this.matchSyntaxExactlyOne(token);
            case SyntaxType.Optional:
                return this.matchOptional(token);
            case SyntaxType.Or:
                return this.matchOr(token);
            case SyntaxType.ZeroOrMore:
                return this.matchZeroOrMore(token);
            default:
                throw new Error(
                    `unhandled syntax definition: ${JSON.stringify(
                        this.syntaxDef
                    )}`
                );
        }
    }

    private matchSyntaxExactlyOne(token: Token): void {
        this.assertSyntax(this.syntaxDef);
        const nextChildStateMachine = this.childStateMachines[0];
        nextChildStateMachine.next(token);
        if (nextChildStateMachine.complete) {
            if (nextChildStateMachine.result) {
                this.childStateMachines.shift();
                pushSyntax(this.childSyntax, nextChildStateMachine.result);
            } else {
                return this.setError(nextChildStateMachine.errorMessage);
            }
        }
        if (this.childStateMachines.length === 0) {
            this.setComplete({
                result: {
                    type: this.syntaxDef.name || "",
                    children: this.childSyntax,
                },
                resultIncludesCurrentInput: !!nextChildStateMachine.resultIncludesCurrentInput,
            });
        }
    }

    private matchOptional(token: Token): void {
        this.assertSyntax(this.syntaxDef);
        const nextChildStateMachine = this.childStateMachines[0];
        nextChildStateMachine.next(token);
        if (nextChildStateMachine.complete) {
            if (nextChildStateMachine.result) {
                this.childStateMachines.shift();
                pushSyntax(this.childSyntax, nextChildStateMachine.result);
            } else {
                if (!this.hasBegunMatchingOptional) {
                    return this.setComplete({
                        result: {
                            type: this.syntaxDef.name || "",
                            children: [],
                        },
                        resultIncludesCurrentInput: false,
                    });
                }
                return this.setError(nextChildStateMachine.errorMessage);
            }
        }
        if (this.childStateMachines.length === 0) {
            return this.setComplete({
                result: {
                    type: this.syntaxDef.name || "",
                    children: this.childSyntax,
                },
                resultIncludesCurrentInput: !!nextChildStateMachine.resultIncludesCurrentInput,
            });
        }
        this.hasBegunMatchingOptional = true;
    }

    private matchOr(token: Token): void {
        this.assertSyntax(this.syntaxDef);
        const nextChildStateMachine = this.childStateMachines[0];
        nextChildStateMachine.next(token);
        if (nextChildStateMachine.complete) {
            if (nextChildStateMachine.result) {
                return this.setComplete({
                    result: {
                        type: this.syntaxDef.name || "",
                        children: [nextChildStateMachine.result],
                    },
                    resultIncludesCurrentInput: !!nextChildStateMachine.resultIncludesCurrentInput,
                });
            } else {
                this.childStateMachines.shift();
                if (this.childStateMachines.length === 0) {
                    return this.setError(nextChildStateMachine.errorMessage);
                }
            }
        }
    }

    private matchZeroOrMore(token: Token): void {
        this.assertSyntax(this.syntaxDef);
        const nextChildStateMachine = this.childStateMachines[0];
        nextChildStateMachine.next(token);
        if (nextChildStateMachine.complete) {
            if (nextChildStateMachine.result) {
                this.childStateMachines.shift();
                pushSyntax(
                    this.childSyntaxBuffer,
                    nextChildStateMachine.result
                );
            } else if (
                this.childStateMachines.length === this.syntaxDef.syntax.length
            ) {
                this.setComplete({
                    result: {
                        type: this.syntaxDef.name || "",
                        children: this.childSyntax,
                    },
                    resultIncludesCurrentInput: false,
                });
            } else {
                this.setError(
                    `Cannot match Zero or more syntax for ${JSON.stringify(
                        this.syntaxDef
                    )}: ${nextChildStateMachine.errorMessage}`
                );
            }
        }
        if (this.childStateMachines.length === 0) {
            pushSyntax(this.childSyntax, ...this.childSyntaxBuffer);
            this.childSyntax = [];
            this.childStateMachines = this.syntaxDef.syntax.map(
                (s) => new SyntaxStateMachine(s)
            );
        }
    }

    private assertTokenMatchTypeAndValue(token: Token, syntax: Token): void {
        if (token.type === syntax.type && token.value === syntax.value) {
            return this.setComplete({
                result: token,
                resultIncludesCurrentInput: true,
            });
        } else {
            return this.setError(
                `Expected exact match for token ${JSON.stringify(
                    syntax
                )}, received ${JSON.stringify(token)}}`
            );
        }
    }

    private assertTokenMatchTypeOnly(
        token: Token,
        syntaxTokenType: TokenType
    ): void {
        if (token.type === syntaxTokenType) {
            return this.setComplete({
                result: token,
                resultIncludesCurrentInput: true,
            });
        } else {
            return this.setError(
                `Expected exact match for token type ${JSON.stringify(
                    syntaxTokenType
                )}, received ${JSON.stringify(token)}}`
            );
        }
    }

    private assertSyntax(syntax: SyntaxDef): asserts syntax is SyntaxDefObj {
        assert(!isSyntax(syntax));
        assert(this.childStateMachines.length > 0);
    }
}
