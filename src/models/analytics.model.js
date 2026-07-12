import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
    {

        toolId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tool"
        },

        fileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "File"
        },

        ip: String,

        country: String,

        browser: String,

        device: String,

        os: String

    },
    {
        timestamps: true
    });
analyticsSchema.index({createdAt:-1});
export const Analytics = mongoose.model("Analytics", analyticsSchema);