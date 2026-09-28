import { Response } from "express";
export var successResponse = ({ res, message = "Success", status = 200, data = null }: { res: Response; message?: string; status?: number; data?: any }) => {
    res.status(status).json({ message, status, data });
};