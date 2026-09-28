import mongoose, { Schema, model } from "mongoose";
import { IComment } from "../../common/interface/comment.interface";

const commentSchema = new Schema<IComment>({
    content: { type: String, required: true, trim: true },
    postId: { type: String, required: true },
    userId: { type: String, required: true }
}, { timestamps: true });

commentSchema.pre("save", function (next) {
    console.log(`Creating comment on post ${this.postId}`);
    next();
});

export const Comment = mongoose.models.Comment || model<IComment>("Comment", commentSchema);