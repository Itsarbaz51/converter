import connectDB from "@/lib/mongodb";

import {
  createToolController,
  deleteToolController,
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


export async function DELETE(request) {
  await connectDB();

  return deleteToolController(request)

}