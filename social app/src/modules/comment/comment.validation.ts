import { z } from "zod";
export const createCommentSchema = {
    body: z.object({
        content: z.string().min(1, "Comment cannot be empty"),
        postId: z.string().min(1, "Post ID is required")
    })
};