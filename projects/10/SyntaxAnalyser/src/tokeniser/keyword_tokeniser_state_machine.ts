import { EnumTokeniserStateMachine } from "./enum_tokeniser_state_machine";
import { Keyword } from "./keyword";
import { TokenType } from "./token_type";

export class KeywordTokeniserStateMachine extends EnumTokeniserStateMachine<
    TokenType.Keyword,
    Keyword
> {
    constructor() {
        super(TokenType.Keyword, Keyword);
    }
}
