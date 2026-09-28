import { Router } from "express";
import * as friendController from "./friend.controller";
import { auth } from "../../middleware/auth.middleware";
import { validation } from "../../middleware/validation.middleware";
import { sendRequestSchema, respondRequestSchema } from "./friend.validation";

const router = Router();

router.post("/send", auth, validation(sendRequestSchema), friendController.sendRequest);
router.post("/respond", auth, validation(respondRequestSchema), friendController.respondToRequest);
router.get("/my-friends", auth, friendController.getMyFriends);
router.get("/pending", auth, friendController.getPendingRequests);

export default router;