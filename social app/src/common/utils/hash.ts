import bcrypt from "bcrypt";
import "dotenv/config";
export let hash = async (text: string): Promise<string> => {
    return bcrypt.hash(text, Number(process.env.SALT_ROUND) || 10);
};
export let compare = async (text: string, hashed: string): Promise<boolean> => {
    return bcrypt.compare(text, hashed);
};