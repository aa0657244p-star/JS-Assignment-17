import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { createServer } from "http";
import authRouter from "../modules/auth";
import userRouter from "../modules/user";
import postRouter from "../modules/post";
import commentRouter from "../modules/comment";
import friendRouter from "../modules/friend";
import { globalErrorHandler } from "../middleware/error.middleware";
import { RealtimeGateway } from "../modules/realtime";
import redisService from "../modules/realtime/redis.service";
import "dotenv/config";

export const bootstrap = async (app: Express) => {
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));

    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/post", postRouter);
    app.use("/comment", commentRouter);
    app.use("/friend", friendRouter);

    app.use(globalErrorHandler);

    const httpServer = createServer(app);

    await redisService.connect();

    const realtimeGateway = new RealtimeGateway(httpServer);
    await realtimeGateway.initialize();

    return httpServer;
};