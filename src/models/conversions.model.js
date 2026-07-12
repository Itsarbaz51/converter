import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema(
    {

        fileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "File"
        },

        toolId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tool"
        },

        outputFileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "File"
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

        error: String

    },
    {
        timestamps: true
    });

conversionSchema.index({ status: 1 });


export const Conversion = mongoose.model("Conversion", conversionSchema);