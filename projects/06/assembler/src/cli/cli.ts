import * as fs from "fs";
import * as readline from "readline";
import * as yargs from "yargs";
import { Compiler } from "../compiler/compiler";

const fileIn = (yargs.argv.file || yargs.argv.in) as string;
if (!fileIn) {
    throw new Error(`Please provide a .asm file input using --file or --in`);
}
const fileOut = (yargs.argv.out || `${fileIn}.out`) as string;

async function main() {
    const fileStream = fs.createReadStream(fileIn);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    fs.writeFileSync(fileOut, "");
    const out = fs.createWriteStream(fileOut, { flags: "a" });
    const compiler = new Compiler();
    for await (const line of compiler.compile(rl)) {
        out.write(line);
    }
    console.log(`Built hack file ${fileOut}`);
}

main().catch(console.error);
