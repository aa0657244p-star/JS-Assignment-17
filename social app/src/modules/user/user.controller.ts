import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import { successResponse } from "../../common/errors/error.response";
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getProfile((req as any).user.id);
        return successResponse({ res, message: "Profile fetched", status: 200, data: user });
    } catch (error) { next(error); }
};