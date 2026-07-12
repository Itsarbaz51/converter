import mongoose from "mongoose";

const logSchema = new mongoose.Schema({

    level: String,

    message: String,

    metadata: Object

}, {
    timestamps: true
});

export const Log = mongoose.model("Log", logSchema);