import mongoose from "mongoose";

const toolSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        category: {
            type: String,
            // enum: [
            //     "image",
            //     "pdf",
            //     "word",
            //     "excel",
            //     "ppt",
            //     "video",
            //     "audio",
            //     "archive",
            //     "utility",
            // ],
            required: true,
        },

        description: {
            type: String,
            default: "",
        },

        inputFormats: {
            type: [String],
            required: true,
            default: [],
        },

        outputFormats: {
            type: [String],
            required: true,
            default: [],
        },

        icon: {
            type: String,
            default: "",
        },

        color: {
            type: String,
            default: "#2563eb",
        },

        engine: {
            type: String,
            // enum: [
            //     "sharp",
            //     "libreoffice",
            //     "ffmpeg",
            //     "imagemagick",
            //     "ocr",
            //     "custom",
            // ],
            required: true,
        },

        priority: {
            type: Number,
            default: 0,
        },

        isPopular: {
            type: Boolean,
            default: false,
        },

        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

toolSchema.index({ slug: 1 });
toolSchema.index({ category: 1 });
toolSchema.index({ active: 1 });

export const Tool =
    mongoose.models.Tool ||
    mongoose.model("Tool", toolSchema);