import { Router } from "express";
import * as postController from "./post.controller";
import { auth } from "../../middleware/auth.middleware";
import { validation } from "../../middleware/validation.middleware";
import { createPostSchema } from "./post.validation";

const router = Router();
router.post("/", auth, validation(createPostSchema), postController.createPost);
router.get("/", auth, postController.getAllPosts);
router.get("/:id", auth, postController.getPostById);
router.delete("/:id", auth, postController.deletePost);
export default router;