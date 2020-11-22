export class StringUtil {
    public static isDigit(str: string): boolean {
        return /^\d+$/.test(str);
    }

    public static isWhitespace(str: string): boolean {
        return /^\s+$/.test(str);
    }
}
