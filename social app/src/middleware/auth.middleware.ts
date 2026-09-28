import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../common/utils/jwt";
import "dotenv/config";
export const auth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const token = authHeader.split(" ")[1];
        const decoded = verifyToken({ token, secret: process.env.JWT_SECRET as string });
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};