import mongoose, { Schema, model } from "mongoose";
import { IPost } from "../../common/interface/post.interface";

const postSchema = new Schema<IPost>({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    likes: [{ type: String }],
    commentsCount: { type: Number, default: 0 }
}, { timestamps: true });

postSchema.pre("save", function (next) {
    console.log(`Creating post: ${this.title}`);
    next();
});

export const Post = mongoose.models.Post || model<IPost>("Post", postSchema);