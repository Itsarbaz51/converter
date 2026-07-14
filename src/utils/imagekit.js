import imagekit from "@/lib/imagekit";
import crypto from "node:crypto";

class ImageKitService {

    async uploadFile(file, folder = "/converter") {
        try {

            if (!file) {
                throw new Error("File is required");
            }

            const checksum = crypto
                .createHash("sha256")
                .update(file.buffer)
                .digest("hex");

            const response = await imagekit.upload({
                file: file.buffer,
                fileName: file.originalname,
                folder,
                useUniqueFileName: true,
            });

            return {
                success: true,
                data: {
                    fileId: response.fileId,
                    name: response.name,
                    url: response.url,
                    filePath: response.filePath,
                    size: response.size,
                    mimeType: response.fileType,
                    checksum,
                },
            };

        } catch (error) {

            throw new Error(error.message);
        }
    }

    async deleteFile(fileId) {
        try {

            await imagekit.deleteFile(fileId);

            return {
                success: true,
                message: "File deleted successfully",
            };

        } catch (error) {

            throw new Error(error.message);
        }
    }

    async getFile(fileId) {
        try {

            const file = await imagekit.getFileDetails(fileId);

            return {
                success: true,
                data: file,
            };

        } catch (error) {

            throw new Error(error.message);
        }
    }

    async listFiles(path = "/converter") {
        try {

            const files = await imagekit.listFiles({
                path,
            });

            return {
                success: true,
                data: files,
            };

        } catch (error) {

            throw new Error(error.message);
        }
    }
}

export default new ImageKitService();