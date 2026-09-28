import { BaseRepository } from "./base.repo";
import { Friend } from "../models/friend.model";
import { IFriend } from "../../common/interface/friend.interface";

export class FriendRepository extends BaseRepository<IFriend> {
    constructor() { super(Friend); }
}
export default new FriendRepository();