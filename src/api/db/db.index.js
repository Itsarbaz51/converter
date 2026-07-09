import mongoose from "mongoose";
import ENV from "../config/env.js";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${ENV.MONGODB_URI}/${ENV.DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;