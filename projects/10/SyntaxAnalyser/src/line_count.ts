export class LineCount {
    public line = 1;
    public col = 0;

    public constructor(public readonly file: string) {}

    public next(str: string): void {
        for (const char of str) {
            if (char === "\n") {
                this.col = 0;
                this.line++;
            } else {
                this.col++;
            }
        }
    }
}
