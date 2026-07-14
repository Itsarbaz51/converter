import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    inputFileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: true
    },

    outputFileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    },

    toolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tool",
        required: true
    },

    inputFormat: String,

    outputFormat: String,

    status: {
        type: String,
        enum: [
            "pending",
            "processing",
            "completed",
            "failed"
        ],
        default: "pending"
    },

    progress: {
        type: Number,
        default: 0
    },

    processingTime: Number,

    error: String,

    startedAt: Date,

    completedAt: Date

}, {
    timestamps: true
});

conversionSchema.index({
    status: 1
});

conversionSchema.index({
    userId: 1
});

export const Conversion =
    mongoose.models.Conversion ||
    mongoose.model("Conversion", conversionSchema);