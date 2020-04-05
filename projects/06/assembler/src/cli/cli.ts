import * as fs from "fs";
import * as readline from "readline";
import { Compiler } from "../compiler/compiler";
import * as yargs from "yargs";

yargs.demandOption("file", "Please provide an asm source file path");
const file = yargs.argv.file as string;

async function main() {
    const fileStream = fs.createReadStream(file);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    fs.writeFileSync(`${file}.out`, "");
    const out = fs.createWriteStream(`${file}.out`, { flags: "a" });
    const compiler = new Compiler();
    for await (const line of compiler.compile(rl)) {
        out.write(line);
    }
}

main().catch(console.error);
