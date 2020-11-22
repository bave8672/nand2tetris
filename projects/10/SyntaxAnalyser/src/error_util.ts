import { LineCount } from "./line_count";

export class ErrorUtil {
    public static compilerError(message: string, lineCount: LineCount): never {
        throw new Error(
            `Jack compiler error: ${message} at ${lineCount.file}:${lineCount.line}:${lineCount.col}`
        );
    }
}
