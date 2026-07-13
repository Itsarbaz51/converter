import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { User } from "@/models/user.model";
import { ApiError } from "@/utils/ApiError";

export const isAuthenticated = async (request) => {
    try {

        const cookieStore = await cookies();

        const accessToken =
            cookieStore.get("accessToken")?.value;

        const authHeader =
            request.headers.get("authorization");

        const bearerToken =
            authHeader?.startsWith("Bearer ")
                ? authHeader.split(" ")[1]
                : null;

        const token = accessToken || bearerToken;

        if (!token) {
            throw new ApiError(401, "Unauthorized");
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id)
            .select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "User not found");
        }

        return user;

    } catch (error) {
        throw new ApiError(401, "Invalid or Expired Token");
    }
};