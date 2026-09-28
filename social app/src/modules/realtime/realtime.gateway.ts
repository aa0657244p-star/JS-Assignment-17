import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import redisService from "./redis.service";
import { AuthSocket } from "../../types/express.types";

export class RealtimeGateway {
    private io: Server;

    constructor(httpServer: HttpServer) {
        this.io = new Server(httpServer, {
            cors: { origin: "*" }
        });
    }

    async initialize() {
        this.io.use(async (socket: AuthSocket, next) => {
            try {
                const token =
                    socket.handshake.auth?.token ||
                    socket.handshake.headers?.authorization?.split(" ")[1] ||
                    socket.handshake.query?.token;

                if (!token) {
                    console.log("No token, connecting as anonymous");
                    socket.data.user = { _id: "anonymous" };
                    return next();
                }

                const decoded: any = await import("../../common/utils/jwt").then(m =>
                    m.verifyToken({ token, secret: process.env.JWT_SECRET as string })
                );

                const user = await import("../../DB/repository/user.repo").then(m =>
                    m.default.findById(decoded.id)
                );

                if (!user) {
                    socket.data.user = { _id: "anonymous" };
                    return next();
                }

                socket.data.user = user;
                next();
            } catch (error) {
                socket.data.user = { _id: "anonymous" };
                next();
            }
        });

        this.io.on("connection", async (socket: AuthSocket) => {
            const user = socket.data.user;
            console.log(`User connected: ${user._id}`);

            await redisService.addSocket(user._id.toString(), socket.id);
            const sockets = await redisService.getSockets(user._id.toString());
            console.log("User sockets:", sockets);

            socket.on("sayHi", (data, callback) => {
                console.log("Message received:", data);
                if (callback) callback("Hello from BE");
            });

            socket.on("disconnect", async () => {
                console.log(`User disconnected: ${user._id}`);
                await redisService.removeSocket(user._id.toString(), socket.id);
            });
        });
    }
}