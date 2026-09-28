import { BaseRepository } from "./base.repo";
import { User } from "../models/user.model";
import { IUser } from "../../common/interface/user.interface";

export class UserRepository extends BaseRepository<IUser> {
    constructor() { super(User); }
}
export default new UserRepository();