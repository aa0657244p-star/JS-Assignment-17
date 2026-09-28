import mongoose, { Schema, model } from "mongoose";
import { IUser } from "../../common/interface/user.interface";
import { Gender } from "../../common/enum/gender.enum";
import { Roles } from "../../common/enum/role.enum";
import { SystemProvider } from "../../common/enum/system.enum";

var userSchema = new Schema<IUser>({
    fname: { type: String, required: true, trim: true },
    lname: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    age: { type: Number, min: 18, max: 60 },
    address: { type: String, default: "" },
    gender: { type: String, enum: Object.values(Gender), default: Gender.MALE },
    role: { type: String, enum: Object.values(Roles), default: Roles.USER },
    provider: { type: String, enum: Object.values(SystemProvider), default: SystemProvider.SYSTEM },
    phone: { type: String, required: true },
    friends: [{ type: String }],
    friendRequests: [{ type: String }],
    sentRequests: [{ type: String }]
}, { timestamps: true });

export const User = mongoose.models.User || model<IUser>("User", userSchema);