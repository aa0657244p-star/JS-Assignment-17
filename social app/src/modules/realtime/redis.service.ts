import { createClient } from "redis";
import "dotenv/config";

class RedisService {
    private client: any;

    constructor() {
        this.client = createClient({
            url: process.env.REDIS_URL,
            RESP: 2
        });
    }

    async connect() {
        try {
            await this.client.connect();
            console.log("Redis connected successfully");
        } catch (error) {
            console.error("Redis connection error:", error);
        }
    }

    async addSocket(userId: string, socketId: string) {
        await this.client.sAdd(`user:sockets:${userId}`, socketId);
    }

    async removeSocket(userId: string, socketId: string) {
        await this.client.sRem(`user:sockets:${userId}`, socketId);
    }

    async getSockets(userId: string) {
        return await this.client.sMembers(`user:sockets:${userId}`);
    }
}

export default new RedisService();