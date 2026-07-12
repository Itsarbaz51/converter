import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

export const seedAdmin = async () => {
    try {
        const admin = await User.findOne({
            email: "admin@converter.com",
        });

        if (admin) {
            console.log("✅ Admin Already Exists");
            return;
        }


        await User.create({
            fullName: "Super Admin",
            email: "admin@converter.com",
            phone: "9999999999",
            password: "Admin@123",
            role: "admin",
            isVerified: true,
        });

        console.log("✅ Admin Created Successfully");
    } catch (error) {
        console.error(error);
    }
};