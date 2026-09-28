import crypto from "crypto";
import "dotenv/config";
var algorithm = "aes-256-cbc";
var key = crypto.scryptSync(process.env.ENCRYPTION_KEY as string, "salt", 32);
export const encrypt = (text: string): string => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return `${iv.toString("hex")}:${encrypted}`;
};
export let decrypt = (cipherText: string): string => {
    const [ivHex, encrypted] = cipherText.split(":");
    const ivBuffer = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};