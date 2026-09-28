import { Router } from "express";
import * as commentController from "./comment.controller";
import { auth } from "../../middleware/auth.middleware";
import { validation } from "../../middleware/validation.middleware";
import { createCommentSchema } from "./comment.validation";

const router = Router();
router.post("/", auth, validation(createCommentSchema), commentController.createComment);
router.get("/post/:postId", auth, commentController.getPostComments);
router.delete("/:id", auth, commentController.deleteComment);
export default router;