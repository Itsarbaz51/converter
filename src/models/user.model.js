import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Please provide your full name"],
        },
        email: {
            type: String,
            required: [true, "Please provide your email address"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: [true, "Please provide your phone number"],
            unique: true,
            maxlength: [10, "Phone number cannot exceed 10 digits"],
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
        },
        avatar: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            enum: ["active", "blocked", "deleted"],
            default: "active",
        },

        lastLoginAt: Date,

        passwordChangedAt: Date,
    },
    {
        timestamps: true,
    }
);

userSchema.methods.generateAccessToken = function () {
    const payload = {
        id: this._id,
        email: this.email,
        role: this.role,
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });
    return accessToken;
}

userSchema.methods.generateRefreshToken = function () {
    const payload = {
        id: this._id,
        email: this.email,
        role: this.role,
    };
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });
    return refreshToken;
}

userSchema.methods.generatePasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User =
    mongoose.models.User ||
    mongoose.model("User", userSchema);

export { User };