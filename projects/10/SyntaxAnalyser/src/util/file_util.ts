import { createReadStream, createWriteStream, writeFile } from "fs";

export class FileUtil {
    public static readFile(filename: string) {
        return createReadStream(filename, { encoding: "utf8" });
    }

    public static async *readChars(filename: string): AsyncGenerator<string> {
        for await (const chunk of FileUtil.readFile(filename)) {
            yield* chunk;
        }
    }

    public static async writeFile(path: string, stream: NodeJS.ReadableStream) {
        return new Promise((res, rej) => {
            writeFile(path, "", (err) => {
                if (err) {
                    rej(err);
                }
                res();
            });
            const writeStream = createWriteStream(path, { flags: "a" });
            stream.pipe(writeStream);
        });
    }
}
