"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_1 = require("../controllers/blog");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const BlogRoutes = express_1.default.Router();
const middlewares = [authMiddleware_1.authMiddleware, authMiddleware_1.AdminWare];
BlogRoutes.post("/add-post", middlewares, blog_1.AddBlogPost);
BlogRoutes.get("/get_post", blog_1.getBlogPost);
BlogRoutes.get("/get_posts", blog_1.getBlogPosts);
BlogRoutes.put("/edit_post", middlewares, blog_1.editBlogPost);
BlogRoutes.delete("/delete_post", middlewares, blog_1.DeleteBlogPost);
exports.default = BlogRoutes;
