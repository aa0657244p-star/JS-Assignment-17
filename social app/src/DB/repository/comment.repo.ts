import { BaseRepository } from "./base.repo";
import { Comment } from "../models/comment.model";
import { IComment } from "../../common/interface/comment.interface";

export class CommentRepository extends BaseRepository<IComment> {
    constructor() { super(Comment); }
}
export default new CommentRepository();