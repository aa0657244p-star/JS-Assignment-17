import mongoose from "mongoose";
import "dotenv/config";
export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI as string);
        console.log("DB connected successfully using Mongoose mesho");
    } catch (error) {
        console.error("DB connection error:", error);
        process.exit(1);
    }
};