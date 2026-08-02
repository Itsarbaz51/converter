import { asyncHandler } from "@/utils/asyncHandler";
import { ApiResponse } from "@/utils/ApiResponse";
import {
  convertService,
  convertedDownloadService,
} from "@/services/conversion.service";


export const convertController = asyncHandler(async (request, paramsPromise) => {
  try {
    const params = await paramsPromise;

    const formData = await request.formData();
    const file = formData.get("file");

    const result = await convertService({
      slug: params.slug,
      file,
    });

    return Response.json(result);
  } catch (error) {
    console.error("CONTROLLER ERROR:", error);

    return Response.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
)


export const convertedDownloadController = asyncHandler(
  async (request, { conversionId }) => {
    const url = await convertedDownloadService(conversionId);

    return Response.redirect(url, 302);
  },
);
