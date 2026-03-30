// //helper file , func need to be reused 
// import jwt from "jsonwebtoken";

// export const generateToken = (userId) => {
//     const payload = { id: userId};
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN || "7d",
//         });
//     return token;

// };
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (userId,res) => {
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
        console.error("❌ JWT_SECRET is not defined in environment variables");
        throw new Error("JWT_SECRET is not configured");
    }
    
    const payload = { id: userId};
    const token = jwt.sign(payload, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 *60 * 24 * 7
    })
    return token;
};