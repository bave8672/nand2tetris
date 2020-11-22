import xml from "xml";
import { FileUtil } from "./file_util";
import { Token } from "./token";

export class TokenWriter {
    public async writeTokens(
        tokens: AsyncIterableIterator<Token>,
        path: string
    ): Promise<void> {
        path = path.replace(/\.jack$/, "T.out.xml");
        const tokenElem = xml.element();
        const stream = xml(
            { tokens: tokenElem },
            { stream: true, indent: "\n    " }
        );
        const write = FileUtil.writeFile(path, stream);
        for await (const token of tokens) {
            tokenElem.push({ [token.type]: token.value });
        }
        tokenElem.close();
        await write;
    }
}
