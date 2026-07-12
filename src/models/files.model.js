import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        originalName: String,

        filename: String,

        extension: String,

        mimeType: String,

        size: Number,

        category: {
            type: String,
            enum: [
                "image",
                "pdf",
                "word",
                "excel",
                "ppt",
                "text",
                "other"
            ]
        },

        storageProvider: {
            type: String,
            enum: ["r2", "imagekit"]
        },

        storageKey: String,

        storageUrl: String,

        checksum: String,

        downloadCount: {
            type: Number,
            default: 0
        },

        expiresAt: Date,

        isDeleted: {
            type: Boolean,
            default: false
        }

    },
    {
        timestamps: true
    });

fileSchema.index({ checksum: 1 });
fileSchema.index({ expiresAt: 1 });

export const File = mongoose.model("File", fileSchema);