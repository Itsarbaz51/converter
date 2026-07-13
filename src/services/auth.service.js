import { User } from "@/models/user.model";
import { ApiError } from "@/utils/ApiError";

const loginService = async ({ email, password }) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    console.log("Entered Password:", password);
    console.log("DB Password:", user.password);

    const isPasswordCorrect = await user.comparePassword(password);

    console.log("Match:", isPasswordCorrect);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid Credentials");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.lastLoginAt = new Date();

    await user.save({
        validateBeforeSave: false,
    });

    const userData = user.toObject();

    delete userData.password;
    delete userData.refreshToken;

    return {
        user: userData,
        accessToken,
        refreshToken,
    };
};

const logoutService = async (user) => {
    user.refreshToken = undefined;

    await user.save({
        validateBeforeSave: false,
    });

    return true;
};

const currentUserService = async (user) => {
    console.log(user.id );

    const currentUser = await User.findOne({ _id: user?.id })
    console.log(currentUser);
    
    if (!currentUser) {
        throw new ApiError(404, "current user not found")
    }
    return currentUser
};

export {
    loginService,
    logoutService,
    currentUserService
}