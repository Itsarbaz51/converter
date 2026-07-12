import { loginValidation } from "@/validations/auth.validation";
import { loginService } from "@/services/auth.service";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";

export const loginController = asyncHandler(
    async (request) => {

        const body = await request.json();

        const data =
            loginValidation.parse(body);

        const result =
            await loginService(data);

        return Response.json(
            new ApiResponse(
                200,
                "Login Successful",
                result
            )
        );
    }
);