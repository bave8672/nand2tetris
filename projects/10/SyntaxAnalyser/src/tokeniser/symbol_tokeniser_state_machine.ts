import { EnumTokeniserStateMachine } from "./enum_tokeniser_state_machine";
import { JackSymbol } from "./symbol";
import { TokenType } from "./token_type";

export class SymbolTokeniserStateMachine extends EnumTokeniserStateMachine<
    TokenType.Symbol,
    JackSymbol
> {
    constructor() {
        super(TokenType.Symbol, JackSymbol);
    }
}
