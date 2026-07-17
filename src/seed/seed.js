import dotenv from "dotenv";

dotenv.config({
  path: "./.env.local",
});

import connectDB from "../lib/mongodb.js";

import { seedAdmin } from "./admin.seed.js";
import { seedTools } from "./tool.seed.js";

(async () => {
  try {
    await connectDB();

    await seedAdmin();
    await seedTools();

    process.exit(0);
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
})();
