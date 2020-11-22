export enum TokenType {
    Keyword = "keyword",
    Symbol = "symbol",
    IntegerConstant = "integerConstant",
    StringConstant = "stringConstant",
    Identifier = "identifier",
    Error = "error",
    Ignored = "ignored",
}

function f(t: { [key: string]: TokenType } = TokenType) {
    Object.keys(TokenType).forEach((d) => d);
}
