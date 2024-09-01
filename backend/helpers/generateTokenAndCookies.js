import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const generateTokenAndSetCookie = (userId, res) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET environment variable is not set");
    }
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "15d",
        });

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
        });

        return token;
    } catch (error) {
        console.error("Error generating token and setting cookie:", error);
        throw new Error("Token generation failed");
    }
};

export default generateTokenAndSetCookie;