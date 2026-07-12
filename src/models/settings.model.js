import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
    {

        siteName: String,

        logo: String,

        maxUploadSize: Number,

        deleteAfterHours: Number,

        maintenance: Boolean,
        metaData: Object,

    },
    {
        timestamps: true
    });

export const Setting = mongoose.model("Setting", settingSchema);