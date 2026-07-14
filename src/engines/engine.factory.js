import SharpEngine from "./sharp.engine.js";
import LibreOfficeEngine from "./libreoffice.engine.js";
import FFmpegEngine from "./ffmpeg.engine.js";
import OCR_Engine from "./ocr.engine.js";
import ImageMagickEngine from "./imagemagick.engine.js";

class EngineFactory {

    static get(engine) {

        switch (engine) {

            case "sharp":
                return SharpEngine;

            case "libreoffice":
                return LibreOfficeEngine;

            case "ffmpeg":
                return FFmpegEngine;

            case "imagemagick":
                return ImageMagickEngine;

            case "ocr":
                return OCR_Engine;

            default:
                throw new Error("Engine Not Found");

        }

    }

}

export default EngineFactory;