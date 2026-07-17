import connectDB from "@/lib/mongodb";

import {
  createToolController,
  getAllToolsController,
} from "@/controllers/tool.controller";

export async function POST(request) {
  await connectDB();

  return createToolController(request);
}

export async function GET(request) {
  await connectDB();

  return getAllToolsController(request);
}
