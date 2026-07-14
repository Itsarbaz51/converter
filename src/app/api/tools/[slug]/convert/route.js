import connectDB from "@/lib/mongodb";
import { convertController } from "@/controllers/conversion.controller.js";

export async function POST(request, { params }) {

    await connectDB();

    return convertController(request, params);

}