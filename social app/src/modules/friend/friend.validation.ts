import { z } from "zod";
export const sendRequestSchema = {
    body: z.object({
        receiverId: z.string().min(1, "Receiver ID is required")
    })
};
export const respondRequestSchema = {
    body: z.object({
        requestId: z.string().min(1, "Request ID is required"),
        action: z.enum(["accept", "reject"])
    })
};