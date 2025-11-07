
import express from "express";
import { DeleteAdmin, EditAdmin, getAdmin, getAdmins, SuspendUser, unSuspendUser } from "../controllers/admin";
import { AddBlogPost, DeleteBlogPost, editBlogPost, getBlogPost, getBlogPosts } from "../controllers/blog";
import { AdminWare, authMiddleware } from "../middlewares/authMiddleware";

const BlogRoutes = express.Router();
const middlewares = [authMiddleware, AdminWare]
BlogRoutes.post("/add-post", middlewares, AddBlogPost)
BlogRoutes.get("/get_post", getBlogPost);
BlogRoutes.get("/get_posts", getBlogPosts);
BlogRoutes.put("/edit_post", middlewares, editBlogPost);
BlogRoutes.delete("/delete_post", middlewares, DeleteBlogPost);



export default BlogRoutes;
