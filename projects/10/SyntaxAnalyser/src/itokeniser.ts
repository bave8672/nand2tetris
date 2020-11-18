export interface ITokeniser {
    hasMoreTokens(): Promise<boolean>;
    advance(): Promise<void>;
    tokenType(): string; // TOKEN_TYPE
    keyword(): string; // KEYWORD
    symbol(): string;
    intVal(): number;
}
