import friendRepo from "../../DB/repository/friend.repo";
import userRepo from "../../DB/repository/user.repo";
import { GlobalError } from "../../common/errors/global.error";
import { FriendStatus } from "../../common/interface/friend.interface";

export const sendRequest = async (senderId: string, receiverId: string) => {
    if (senderId === receiverId) throw new GlobalError("You can't add yourself", 400);
    const receiver = await userRepo.findById(receiverId);
    if (!receiver) throw new GlobalError("User not found", 404);
    const existing = await friendRepo.findOne({ senderId, receiverId });
    if (existing) throw new GlobalError("Request already sent", 409);
    return await friendRepo.create({ senderId, receiverId, status: FriendStatus.PENDING });
};

export const respondToRequest = async (userId: string, requestId: string, action: string) => {
    const request = await friendRepo.findById(requestId);
    if (!request) throw new GlobalError("Request not found", 404);
    if (request.receiverId.toString() !== userId) throw new GlobalError("Unauthorized", 403);

    if (action === "accept") {
        request.status = FriendStatus.ACCEPTED;
        await userRepo.updateOne({ _id: request.senderId }, { $addToSet: { friends: request.receiverId } });
        await userRepo.updateOne({ _id: request.receiverId }, { $addToSet: { friends: request.senderId } });
    } else {
        request.status = FriendStatus.REJECTED;
    }
    return await friendRepo.updateOne({ _id: requestId }, { status: request.status });
};

export const getMyFriends = async (userId: string) => {
    const user = await userRepo.findById(userId);
    if (!user) throw new GlobalError("User not found", 404);
    return user.friends || [];
};

export const getPendingRequests = async (userId: string) => {
    return await friendRepo.find({ receiverId: userId, status: FriendStatus.PENDING });
};