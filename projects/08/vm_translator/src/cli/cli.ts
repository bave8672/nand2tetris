const start = clock();

import * as fs from "fs";
import { glob } from "glob";
import * as readline from "readline";
import * as yargs from "yargs";
import { Compiler } from "../compiler/compiler";

async function main() {
    const pattern = (yargs.argv.file ||
        yargs.argv.in ||
        yargs.argv.glob) as string;
    if (!pattern) {
        throw new Error(
            `Please provide a .asm file input pattern using --file or --in or --glob`
        );
    }
    const fileOpts = glob.sync(pattern).map((file) => {
        const fileStream = fs.createReadStream(file);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        return { lines: rl, name: file };
    });
    const fileOut = (yargs.argv.out || "out.asm") as string;
    fs.writeFileSync(fileOut, "");
    const out = fs.createWriteStream(fileOut, { flags: "a" });
    const compiler = new Compiler();
    for await (const line of compiler.compile(fileOpts)) {
        out.write(line);
    }
    console.log(`Built asm file ${fileOut} in ${clock(start)}ms`);
}

function clock(): [number, number];
function clock(start?: [number, number]): number;
function clock(start?: [number, number]) {
    if (!start) return process.hrtime();
    const end = process.hrtime(start);
    return Math.round(end[0] * 1000 + end[1] / 1000000);
}

main().catch(console.error);
