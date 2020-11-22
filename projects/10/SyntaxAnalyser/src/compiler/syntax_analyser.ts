import { Parser } from "../parser/parser";
import { MyTokeniser } from "../tokeniser/my_tokeniser";
import { TokenWriter } from "../tokeniser/token_writer";
import { IteratorUtil } from "../util/iterator_util";

export class SyntaxAnalyser {
    public constructor(
        private readonly tokeniser = new MyTokeniser(),
        private readonly tokenWriter = new TokenWriter(),
        private readonly parser = new Parser()
    ) {}

    public async analyse(
        chars: AsyncIterableIterator<string>,
        path: string
    ): Promise<any> {
        const tokens = this.tokeniser.parseTokens(chars, path);
        const [tokenWriteResult, syntax] = IteratorUtil.multiplex(
            tokens,
            (tokens) => this.tokenWriter.writeTokens(tokens, path),
            this.parser.parseTokens
        );
        await tokenWriteResult;
    }
}
