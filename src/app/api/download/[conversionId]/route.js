import { convertedDownloadController } from "@/controllers/conversion.controller";
import connectDB from "@/lib/mongodb";

export async function GET(request, { params }) {
  await connectDB();

  return convertedDownloadController(request, await params);
}
