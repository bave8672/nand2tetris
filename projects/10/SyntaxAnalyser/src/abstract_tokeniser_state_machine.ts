import { TokenType } from "./token_type";

export abstract class AbstractTokeniserStateMachine<T extends TokenType, V> {
    complete: boolean = false;
    tokenType?: T;
    value?: V;
    errorMessage?: string;
    resultIncludesCurrentChar?: boolean;

    public abstract next(char: string): void;

    protected setComplete({
        tokenType,
        value,
        resultIncludesCurrentChar,
    }: {
        tokenType: T;
        value: V;
        resultIncludesCurrentChar: boolean;
    }): void {
        this.tokenType = tokenType;
        this.value = value;
        this.complete = true;
        this.resultIncludesCurrentChar = resultIncludesCurrentChar;
        this.errorMessage = undefined;
    }

    protected setError(errorMessage: string | undefined): void {
        this.errorMessage = errorMessage;
        this.tokenType = undefined;
        this.value = undefined;
        this.complete = true;
    }
}
