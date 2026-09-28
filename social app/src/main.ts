import express from "express";
import "dotenv/config";
import { bootstrap } from "./bootstrap/bootstrap";
import { dbConnection } from "./DB/db.connection";

const app = express();
const PORT = process.env.PORT || 8000;

const startServer = async () => {
    const httpServer = await bootstrap(app);

    httpServer.listen(PORT, async () => {
        await dbConnection();
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();