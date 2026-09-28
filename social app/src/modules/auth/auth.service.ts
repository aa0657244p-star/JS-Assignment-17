import userRepo from "../../DB/repository/user.repo";
import { compare, hash } from "../../common/utils/hash";
import { encrypt } from "../../common/utils/encryption";
import { GlobalError } from "../../common/errors/global.error";
import { generateToken } from "../../common/utils/jwt";
import "dotenv/config";

export const register = async (data: any) => {
    const existingUser = await userRepo.findOne({ email: data.email });
    if (existingUser) throw new GlobalError("Email already exists", 409);
    const hashedPassword = await hash(data.password);
    const encryptedPhone = encrypt(data.phone);
    return await userRepo.create({ ...data, password: hashedPassword, phone: encryptedPhone });
};

export const login = async ({ email, password }: { email: string; password: string }) => {
    const user = await userRepo.findOne({ email });
    if (!user) throw new GlobalError("Invalid email or password", 401);
    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new GlobalError("Invalid email or password", 401);
    const accessToken = generateToken({
        payload: { id: user._id, email: user.email, role: user.role },
        secret: process.env.JWT_SECRET as string,
        expiresIn: "1h"
    });
    const refreshToken = generateToken({
        payload: { id: user._id, email: user.email },
        secret: process.env.JWT_REFRESH_SECRET as string,
        expiresIn: "7d"
    });
    return { user, accessToken, refreshToken };
};