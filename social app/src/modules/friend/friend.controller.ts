import { Request, Response, NextFunction } from "express";
import * as friendService from "./friend.service";
import { successResponse } from "../../common/errors/error.response";

export const sendRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await friendService.sendRequest((req as any).user.id, req.body.receiverId);
        return successResponse({ res, message: "Friend request sent", status: 201, data: result });
    } catch (error) { next(error); }
};

export const respondToRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await friendService.respondToRequest((req as any).user.id, req.body.requestId, req.body.action);
        return successResponse({ res, message: `Request ${req.body.action}ed`, status: 200, data: result });
    } catch (error) { next(error); }
};

export const getMyFriends = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const friends = await friendService.getMyFriends((req as any).user.id);
        return successResponse({ res, message: "Friends fetched", status: 200, data: friends });
    } catch (error) { next(error); }
};

export const getPendingRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requests = await friendService.getPendingRequests((req as any).user.id);
        return successResponse({ res, message: "Pending requests fetched", status: 200, data: requests });
    } catch (error) { next(error); }
};