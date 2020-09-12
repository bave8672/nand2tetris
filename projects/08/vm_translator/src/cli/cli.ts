const start = clock();

import * as fs from "fs";
import { glob } from "glob";
import * as readline from "readline";
import * as yargs from "yargs";
import { Compiler, CompilerConfig } from "../compiler/compiler";

async function main() {
    const files = getFiles();
    const fileOut = getFileOut();
    fs.writeFileSync(fileOut, "");
    const out = fs.createWriteStream(fileOut, { flags: "a" });
    const config = getConfig();
    const compiler = new Compiler(config);
    for await (const line of compiler.compile(files)) {
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

function getPattern() {
    const pattern = (yargs.argv.file ||
        yargs.argv.in ||
        yargs.argv.glob) as string;
    if (!pattern) {
        throw new Error(
            `Please provide a .asm file input pattern using --file or --in or --glob`
        );
    }
    return pattern;
}

function getFiles() {
    const pattern = getPattern();
    const files = glob.sync(pattern).map((file) => ({
        name: file.replace(/^[^[a-zA-Z0-9]?(.+\/)?/, ""),
        getLines: () => {
            const fileStream = fs.createReadStream(file);
            return readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity,
            });
        },
    }));
    return files;
}

function getFileOut() {
    return (yargs.argv.out || "out.asm") as string;
}

function getConfig(): CompilerConfig {
    return {};
}

main().catch(console.error);
