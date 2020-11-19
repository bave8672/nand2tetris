import { createReadStream } from "fs";

export class FileUtil {
    public static streamFile(filename: string) {
        return createReadStream(filename, { encoding: "utf8" });
    }

    public static async *readChars(filename: string): AsyncIterable<string> {
        for await (const chunk of FileUtil.streamFile(filename)) {
            yield* chunk;
        }
    }
}
