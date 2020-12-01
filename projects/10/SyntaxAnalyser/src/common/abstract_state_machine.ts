export abstract class AbstractStateMachine<TInput, TResult> {
    complete: boolean = false;
    result?: TResult;
    errorMessage?: string;
    resultIncludesCurrentInput?: boolean;

    public abstract next(input: TInput): void;

    protected setComplete({
        result,
        resultIncludesCurrentInput,
    }: {
        result: TResult;
        resultIncludesCurrentInput: boolean;
    }): void {
        this.result = result;
        this.complete = true;
        this.resultIncludesCurrentInput = resultIncludesCurrentInput;
        this.errorMessage = undefined;
    }

    protected setError(errorMessage: string | undefined): void {
        this.errorMessage = errorMessage;
        this.result = undefined;
        this.complete = true;
    }
}
