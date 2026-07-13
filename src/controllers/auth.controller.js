import { loginValidation } from "@/validations/auth.validation";
import { loginService, logoutService, currentUserService } from "@/services/auth.service";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { cookies } from "next/headers";
import { isAuthenticated } from "@/middleware/auth.middleware";

const loginController = asyncHandler(
    async (request) => {

        const body = await request.json();

        const data =
            loginValidation.parse(body);

        const result = await loginService(data);

        const { accessToken, refreshToken } = result;

        const cookieStore = await cookies();

        cookieStore.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 15,
            path: "/",
        });

        cookieStore.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return Response.json(
            new ApiResponse(
                200,
                "Login Successful",
                result
            )
        );
    }
);

const logoutController = asyncHandler(async (request) => {

    const user = await isAuthenticated(request);

    await logoutService(user);

    const cookieStore = await cookies();

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return Response.json(
        new ApiResponse(200, "Logout Successfully")
    );
});

export const currentUserController = asyncHandler(async (request) => {

    const user = await isAuthenticated(request);
    const currentUser = (await currentUserService(user)).toObject();
    const { password, refreshToken, ...safeUser } = currentUser;

    return Response.json(
        new ApiResponse(
            200,
            "Current user fetched successfully",
            safeUser
        )
    );
});

export {
    loginController,
    logoutController,
    currentUserController
}