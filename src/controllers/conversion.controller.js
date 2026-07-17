import { asyncHandler } from "@/utils/asyncHandler";
import { ApiResponse } from "@/utils/ApiResponse";
import {
  convertService,
  convertedDownloadService,
} from "@/services/conversion.service";

export const convertController = asyncHandler(
  async (request, paramsPromise) => {
    const params = await paramsPromise;

    const formData = await request.formData();
    const file = formData.get("file");

    const result = await convertService({
      slug: params.slug,
      file,
    });

    return Response.json(
      new ApiResponse(200, "File Converted Successfully", result),
    );
  },
);

export const convertedDownloadController = asyncHandler(
  async (request, { conversionId }) => {
    const url = await convertedDownloadService(conversionId);

    return Response.redirect(url, 302);
  },
);
