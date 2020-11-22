import { execSync } from "child_process";
import { glob } from "glob";
import { FileUtil } from "./file_util";
import { StringUtil } from "./string_util";

describe(`xml tests`, () => {
    beforeAll(() => {
        // build the compiler
        execSync(`npm run build`);
    });

    testXml("../ArrayTest");
    testXml("../ExpressionLessSquare");
    testXml("../Square");

    function testXml(path: string) {
        describe(`XML tests for path ${path}`, () => {
            it(`should compile the jack files without error`, () => {
                execSync(`npm run start -- --path="${path}" `);
            });

            describe(`tokenisation`, () => {
                for (const providedXmlFilePath of glob.sync(
                    `${path}/**/*T.xml`
                )) {
                    it(`should match the provided token XML file ${providedXmlFilePath}`, async () => {
                        const generatedXmlPath = providedXmlFilePath.replace(
                            /T\.xml$/,
                            "T.out.xml"
                        );
                        await assertFilesEqualIgnoringWhitespace(
                            providedXmlFilePath,
                            generatedXmlPath
                        );
                    });
                }
            });
        });
    }

    async function assertFilesEqualIgnoringWhitespace(
        pathA: string,
        pathB: string
    ) {
        let iterA = FileUtil.readChars(pathA);
        let iterB = FileUtil.readChars(pathB);
        let a = await iterA.next();
        let b = await iterB.next();
        while (!a.done) {
            while (StringUtil.isWhitespace(a.value) && !a.done) {
                a = await iterA.next();
            }
            while (StringUtil.isWhitespace(b.value) && !b.done) {
                b = await iterB.next();
            }
            expect(a.value).toBe(b.value);
            if (!a.done) {
                expect(b.done).toBe(false);
                a = await iterA.next();
                b = await iterB.next();
            }
        }
        while (!b.done) {
            expect(StringUtil.isWhitespace(b.value)).toBe(true);
            b = await iterB.next();
        }
    }
});
