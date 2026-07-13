import { logoutController } from "@/controllers/auth.controller.js";
import connectDB from "@/lib/mongodb";

export async function POST(request) {
    await connectDB();

    return logoutController(request);
}