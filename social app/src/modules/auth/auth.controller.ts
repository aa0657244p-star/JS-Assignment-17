import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { successResponse } from "../../common/errors/error.response";
export var register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        var result = await authService.register(req.body);
        return successResponse({ res, message: "User registered", status: 201, data: result });
    } catch (error) { next(error); }
};
export var login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        var result = await authService.login(req.body);
        return successResponse({ res, message: "Login successful", status: 200, data: result });
    } catch (error) { next(error); }
};