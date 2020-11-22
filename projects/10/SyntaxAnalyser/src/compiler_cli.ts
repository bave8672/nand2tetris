import { glob } from "glob";
import * as yargs from "yargs";
import { Compiler } from "./compiler";

export class CompilerCli {
    public constructor(private readonly compiler = new Compiler()) {}

    public async main() {
        const files = this.getFiles();
        await this.compiler.compile(...files);
    }

    private getPattern() {
        let pattern = (yargs.argv.file ||
            yargs.argv.in ||
            yargs.argv.glob ||
            yargs.argv.dir ||
            yargs.argv.directory ||
            yargs.argv.folder ||
            yargs.argv.path) as string;
        if (!pattern) {
            throw new Error(
                `Please provide a file or directory input pattern using --path`
            );
        }
        if (!/\.jack$/.test(pattern)) {
            if (pattern[pattern.length - 1] !== "/") {
                pattern += "/";
            }
            pattern += "**/*.jack";
        }
        return pattern;
    }

    private getFiles() {
        const pattern = this.getPattern();
        return glob.sync(pattern);
    }
}
