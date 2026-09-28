import mongoose, { Schema, model } from "mongoose";
import { IFriend, FriendStatus } from "../../common/interface/friend.interface";

var friendSchema = new Schema<IFriend>({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    status: { type: String, enum: Object.values(FriendStatus), default: FriendStatus.PENDING }
}, { timestamps: true });

export const Friend = mongoose.models.Friend || model<IFriend>("Friend", friendSchema);