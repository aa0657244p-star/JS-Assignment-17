import { Request, Response, NextFunction } from "express";
import { GlobalError } from "../common/errors/global.error";
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err instanceof GlobalError ? err.status : 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message, status, extra: err.extra || null });
};