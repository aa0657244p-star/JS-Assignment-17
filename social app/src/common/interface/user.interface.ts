import { Roles } from "../enum/role.enum";
import { Gender } from "../enum/gender.enum";
import { SystemProvider } from "../enum/system.enum";

export interface IUser {
    _id?: string;
    fname: string;
    lname: string;
    username: string;
    email: string;
    password: string;
    age: number;
    address: string;
    gender: Gender;
    role: Roles;
    provider: SystemProvider;
    phone: string;
    friends?: string[];
    friendRequests?: string[];
    sentRequests?: string[];
}