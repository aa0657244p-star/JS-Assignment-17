import commentRepo from "../../DB/repository/comment.repo";
import postRepo from "../../DB/repository/post.repo";
import { GlobalError } from "../../common/errors/global.error";

export const createComment = async (userId: string, data: any) => {
    const post = await postRepo.findById(data.postId);
    if (!post) throw new GlobalError("Post not found", 404);
    return await commentRepo.create({ ...data, userId });
};

export const getPostComments = async (postId: string) => {
    return await commentRepo.find({ postId });
};

export const deleteComment = async (id: string, userId: string) => {
    const comment = await commentRepo.findById(id);
    if (!comment) throw new GlobalError("Comment not found", 404);
    if (comment.userId.toString() !== userId) throw new GlobalError("Unauthorized", 403);
    return await commentRepo.deleteOne({ _id: id });
};