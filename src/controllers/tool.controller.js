import {
  createToolService,
  deleteToolService,
  getAllToolsService,
  getToolService,
  updateToolService,
} from "@/services/tool.service";

import {
  createToolValidation,
  updateToolValidation,
} from "@/validations/tool.validation";

import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";

export const createToolController = asyncHandler(async (request) => {
  const body = await request.json();

  const data = createToolValidation.parse(body);

  const tool = await createToolService(data);

  return Response.json(new ApiResponse(201, "Tool Created Successfully", tool));
});

export const getAllToolsController = asyncHandler(async (request) => {
  const { searchParams } = new URL(request.url);

  const result = await getAllToolsService({
    page: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 10,
    search: searchParams.get("search") || "",
    category: searchParams.get("category"),
    engine: searchParams.get("engine"),
    active: searchParams.get("active"),
  });

  return Response.json(
    new ApiResponse(200, "Tools fetched successfully", result),
  );
});

export const getToolController = asyncHandler(async (request, { id }) => {
  const tool = await getToolService(id);

  return Response.json(new ApiResponse(200, "Tool fetched successfully", tool));
});

export const updateToolController = asyncHandler(async (request, { id }) => {
  const body = await request.json();

  const data = updateToolValidation.parse(body);

  const tool = await updateToolService(id, data);

  return Response.json(new ApiResponse(200, "Tool updated successfully", tool));
});

export const deleteToolController = asyncHandler(async (request, { id }) => {
  await deleteToolService(id);

  return Response.json(new ApiResponse(200, "Tool deleted successfully"));
});
