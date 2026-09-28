import { Request, Response, NextFunction } from "express";
import * as postService from "./post.service";
import { successResponse } from "../../common/errors/error.response";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await postService.createPost((req as any).user.id, req.body);
        return successResponse({ res, message: "Post created", status: 201, data: post });
    } catch (error) { next(error); }
};

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await postService.getAllPosts();
        return successResponse({ res, message: "Posts fetched", status: 200, data: posts });
    } catch (error) { next(error); }
};

export const getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await postService.getPostById(req.params.id);
        return successResponse({ res, message: "Post fetched", status: 200, data: post });
    } catch (error) { next(error); }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await postService.deletePost(req.params.id, (req as any).user.id);
        return successResponse({ res, message: "Post deleted", status: 200 });
    } catch (error) { next(error); }
};