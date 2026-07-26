import connectDB from "@/lib/mongodb";
import { convertController } from "@/controllers/conversion.controller.js";

export async function POST(request, { params }) {
  try {
    await connectDB();

    return await convertController(request, params);
  } catch (error) {
    console.error("API ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}