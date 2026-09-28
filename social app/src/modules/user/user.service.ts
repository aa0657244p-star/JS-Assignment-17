import userRepo from "../../DB/repository/user.repo";
import { GlobalError } from "../../common/errors/global.error";
import { decrypt } from "../../common/utils/encryption";
export const getProfile = async (id: string) => {
    const user = await userRepo.findById(id);
    if (!user) throw new GlobalError("User not found", 404);
    if (user.phone) user.phone = decrypt(user.phone);
    return user;
};