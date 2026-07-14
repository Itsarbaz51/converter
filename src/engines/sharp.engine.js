import sharp from "sharp";

class SharpEngine {

    async convert(buffer, outputFormat) {

        switch (outputFormat) {

            case "jpg":

            case "jpeg":

                return await sharp(buffer)
                    .jpeg({
                        quality: 90
                    })
                    .toBuffer();

            case "png":

                return await sharp(buffer)
                    .png()
                    .toBuffer();

            case "webp":

                return await sharp(buffer)
                    .webp({
                        quality: 90
                    })
                    .toBuffer();

            case "avif":

                return await sharp(buffer)
                    .avif({
                        quality: 80
                    })
                    .toBuffer();

            default:

                throw new Error("Unsupported Format");

        }

    }

}

export default new SharpEngine();