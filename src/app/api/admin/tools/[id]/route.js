import connectDB from "@/lib/mongodb";

import {
  getToolController,
  updateToolController,
  deleteToolController,
} from "@/controllers/tool.controller";

export async function GET(request, { params }) {
  await connectDB();

  return getToolController(request, await params);
}

export async function PATCH(request, { params }) {
  await connectDB();

  return updateToolController(request, await params);
}

export async function DELETE(request, { params }) {
  await connectDB();

  return deleteToolController(request, await params);
}
