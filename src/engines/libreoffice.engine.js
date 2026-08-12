import fs from "fs/promises";
import path from "path";
import os from "os";
import { randomUUID } from "crypto";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

class LibreOfficeEngine {
    async convert(inputBuffer, outputFormat) {
        const tempDir = await fs.mkdtemp(
            path.join(os.tmpdir(), "converter-")
        );

        const profileDir = path.join(tempDir, "lo-profile");

        const inputPath = path.join(
            tempDir,
            `${randomUUID()}.pdf`
        );

        const outputPath = path.join(
            tempDir,
            `${path.basename(inputPath, ".pdf")}.${outputFormat}`
        );

        try {
            // 1. Create LibreOffice profile directory
            await fs.mkdir(profileDir, { recursive: true });

            // 2. Save uploaded PDF
            await fs.writeFile(inputPath, inputBuffer);

            // 3. Select LibreOffice filter
            let convertFormat;

            switch (outputFormat) {
                case "docx":
                    convertFormat = "docx:Office Open XML Text";
                    break;

                default:
                    throw new Error(
                        `Unsupported LibreOffice output format: ${outputFormat}`
                    );
            }

            // 4. Convert PDF -> DOCX
            await execFileAsync("soffice.com", [
                `-env:UserInstallation=file:///${profileDir.replace(/\\/g, "/")}`,
                "--headless",
                "--nologo",
                "--nodefault",
                "--nofirststartwizard",
                "--norestore",
                "--convert-to",
                convertFormat,
                "--outdir",
                tempDir,
                inputPath,
            ]);

            // 5. Check whether DOCX was actually created
            try {
                await fs.access(outputPath);
            } catch {
                throw new Error(
                    `LibreOffice did not create the output file: ${outputPath}`
                );
            }

            // 6. Read DOCX
            const convertedBuffer = await fs.readFile(outputPath);

            return convertedBuffer;

        } finally {
            // 7. Delete temporary files
            await fs.rm(tempDir, {
                recursive: true,
                force: true,
            });
        }
    }
}

export default new LibreOfficeEngine();