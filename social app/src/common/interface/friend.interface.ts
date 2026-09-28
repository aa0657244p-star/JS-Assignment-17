export enum FriendStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected"
}

export interface IFriend {
    _id?: string;
    senderId: string;
    receiverId: string;
    status: FriendStatus;
}