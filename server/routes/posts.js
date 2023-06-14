import express from "express";
import {
  getFeedPostsController,
  getUsersPostsController,
  likePostController,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// read
router.get("/", verifyToken, getFeedPostsController); // get feed posts
router.get("/:userId/posts", verifyToken, getUsersPostsController); // get users posts

// update
router.patch("/:id/like", verifyToken, likePostController); // like post

export default router;
