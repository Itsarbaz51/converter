import mongoose from "mongoose";

let isConnected = false;

export default async function connectDB() {
    if (isConnected) {
        console.log("MongoDB Already Connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("❌ MongoDB Error:", error.message);
        throw error;
    }
}