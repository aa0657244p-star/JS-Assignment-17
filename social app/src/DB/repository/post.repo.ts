import { BaseRepository } from "./base.repo";
import { Post } from "../models/post.model";
import { IPost } from "../../common/interface/post.interface";

export class PostRepository extends BaseRepository<IPost> {
    constructor() { super(Post); }
}
export default new PostRepository();