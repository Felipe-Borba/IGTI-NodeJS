import express from "express";
import PostController from "../controller/post.js";

const router = express.Router();

router.post("/post", PostController.createPost);
router.get("/post", PostController.getPostList);
router.post("/comment", PostController.createComment);

export default router;
