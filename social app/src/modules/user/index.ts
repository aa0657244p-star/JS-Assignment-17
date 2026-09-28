import { Router } from "express";
import * as userController from "./user.controller";
import { auth } from "../../middleware/auth.middleware";
const router = Router();
router.get("/profile", auth, userController.getProfile);
export default router;