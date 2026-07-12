import connectDB from "@/lib/mongodb";
import { loginController } from "@/controllers/auth.controller";

export async function POST(request) {

    await connectDB();

    return loginController(request);

}