import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    originalName: {
        type: String,
        required: true
    },

    filename: {
        type: String,
        required: true
    },

    extension: {
        type: String,
        required: true
    },

    mimeType: {
        type: String,
        required: true
    },

    size: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    storageProvider: {
        type: String,
        required: true
    },

    storageKey: String,

    storageUrl: String,

    checksum: {
        type: String,
        index: true
    },

    width: Number,

    height: Number,

    pages: Number,

    duration: Number,

    downloadCount: {
        type: Number,
        default: 0
    },

    expiresAt: {
        type: Date,
        index: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

export const File =
    mongoose.models.File ||
    mongoose.model("File", fileSchema);