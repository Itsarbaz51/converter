import { asyncHandler } from "@/utils/asyncHandler";
import { ApiResponse } from "@/utils/ApiResponse";
import { convertService } from "@/services/conversion.service";

export const convertController = asyncHandler(
    async (request, params) => {

        const formData = await request.formData();

        const file = formData.get("file");

        const result = await convertService({
            slug: params.slug,
            file
        });

        return Response.json(
            new ApiResponse(
                200,
                "File Converted Successfully",
                result
            )
        );

    }
);