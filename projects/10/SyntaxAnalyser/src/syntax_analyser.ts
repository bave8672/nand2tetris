import { IteratorUtil } from "./iterator_util";
import { MyTokeniser } from "./my_tokeniser";
import { Parser } from "./parser";
import { TokenWriter } from "./token_writer";

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
