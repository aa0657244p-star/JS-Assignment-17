import postRepo from "../../DB/repository/post.repo";
import { GlobalError } from "../../common/errors/global.error";

export const createPost = async (userId: string, data: any) => {
    return await postRepo.create({ ...data, userId });
};

export const getAllPosts = async () => {
    return await postRepo.find({});
};

export const getPostById = async (id: string) => {
    const post = await postRepo.findById(id);
    if (!post) throw new GlobalError("Post not found", 404);
    return post;
};

export const deletePost = async (id: string, userId: string) => {
    const post = await postRepo.findById(id);
    if (!post) throw new GlobalError("Post not found", 404);
    if (post.userId.toString() !== userId) throw new GlobalError("Unauthorized", 403);
    return await postRepo.deleteOne({ _id: id });
};