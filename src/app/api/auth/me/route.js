import { currentUserController } from "@/controllers/auth.controller.js";
import connectDB from "@/lib/mongodb";

export async function GET(request) {
    await connectDB();

    return currentUserController(request);
}