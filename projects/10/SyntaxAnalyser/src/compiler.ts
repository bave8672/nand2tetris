import { FileUtil } from "./file_util";
import { SyntaxAnalyser } from "./syntax_analyser";

export class Compiler {
    public constructor(
        private readonly syntaxAnalyser = new SyntaxAnalyser()
    ) {}

    public async compile(...paths: string[]) {
        await Promise.all(paths.map((path) => this.compileFile(path)));
    }

    private async compileFile(path: string) {
        const chars = FileUtil.readChars(path);
        await this.syntaxAnalyser.analyse(chars, path);
    }
}
