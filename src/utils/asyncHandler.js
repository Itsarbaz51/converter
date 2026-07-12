export const asyncHandler = (handler) => {
    return async (...args) => {
        try {
            return await handler(...args);
        } catch (error) {
            console.error(error);

            return Response.json(
                {
                    success: false,
                    message: error.message || "Internal Server Error",
                },
                {
                    status: error.statusCode || 500,
                }
            );
        }
    };
};