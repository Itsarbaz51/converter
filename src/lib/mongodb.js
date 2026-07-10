import mongoose from "mongoose";

export default async function connectDB() {
    try {
        const res = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`,);
        console.log(`MONGODB connect successfully || DB host ${res.connection.host}`);
    } catch (error) {
        console.error("MongoDB Error:", error.message);
    }
}