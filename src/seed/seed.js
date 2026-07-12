import dotenv from "dotenv";

dotenv.config({
    path: "./.env.local",
});

import connectDB from "../lib/mongodb.js";

import { seedAdmin } from "./admin.seed.js";

(async () => {
    try {
        const res = await connectDB();
        console.log({res});
        
        await seedAdmin();

        process.exit(0);
    } catch (error) {
        console.log(error);

        process.exit(1);
    }
})();