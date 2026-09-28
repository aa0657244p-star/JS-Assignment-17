import { Request, Response, NextFunction } from "express";
import * as commentService from "./comment.service";
import { successResponse } from "../../common/errors/error.response";

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await commentService.createComment((req as any).user.id, req.body);
        return successResponse({ res, message: "Comment created", status: 201, data: comment });
    } catch (error) { next(error); }
};

export const getPostComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comments = await commentService.getPostComments(req.params.postId);
        return successResponse({ res, message: "Comments fetched", status: 200, data: comments });
    } catch (error) { next(error); }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await commentService.deleteComment(req.params.id, (req as any).user.id);
        return successResponse({ res, message: "Comment deleted", status: 200 });
    } catch (error) { next(error); }
};