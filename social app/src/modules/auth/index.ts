import { Router } from "express";
import * as authController from "./auth.controller";
import { validation } from "../../middleware/validation.middleware";
import { loginSchema, registerSchema } from "./auth.validation";
const router = Router();
router.post("/register", validation(registerSchema), authController.register);
router.post("/login", validation(loginSchema), authController.login);
export default router;