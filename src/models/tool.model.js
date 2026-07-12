import mongoose from "mongoose";

const toolSchema = new mongoose.Schema(
    {

        name: String,

        slug: {
            type: String,
            unique: true
        },

        category: String,

        description: String,

        inputFormats: [String],

        outputFormats: [String],

        icon: String,

        active: {
            type: Boolean,
            default: true
        }

    },
    {
        timestamps: true
    });

toolSchema.index({ slug: 1 });


export const Tool = mongoose.model("Tool", toolSchema);