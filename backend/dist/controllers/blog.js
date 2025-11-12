"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogPosts = exports.getBlogPost = exports.DeleteBlogPost = exports.editBlogPost = exports.AddBlogPost = void 0;
const blogValidator_1 = require("../validators/blogValidator");
const blogModel_1 = require("../models/blogModel");
const cloudinary_1 = require("../services/cloudinary");
const AddBlogPost = async (req, res) => {
    try {
        const { error, value } = blogValidator_1.BlogValidator.validate(req.body, { abortEarly: false });
        const { tittle, content } = value;
        if (error) {
            return res.status(401).json({
                message: "Validation Error",
                error: error.details.map(detail => detail.message)
            });
        }
        //save directory to cloudinary and use save the image url to db
        const image = req.file;
        if (!image) {
            return res.status(401).json({
                message: "Validation Error",
                error: "No image file"
            });
        }
        //gettinng data and error mesage from cludinary helper function i created
        const { data, errorMessage } = await (0, cloudinary_1.ImageToCloudinary)(image);
        if (errorMessage) {
            return res.status(500).json({
                message: "Failed to upload image on cloudinary",
                error: errorMessage
            });
        }
        const newBlogPost = new blogModel_1.BlogModel({
            tittle,
            content,
            image: data.secure_url,
            postedBy: req.user.id
        });
        newBlogPost.save();
    }
    catch (error) {
        return res.status(500).json({
            message: "Validation Error",
            error: error
        });
    }
};
exports.AddBlogPost = AddBlogPost;
const editBlogPost = async (req, res) => {
    try {
        const id = req.user.id;
        const blogPostId = req.params.post_id;
        const blogPost = await blogModel_1.BlogModel.findById(blogPostId);
        if (blogPost) {
            return res.status(404)
                .json({
                message: "Not found",
                error: "The intended blog post is not found"
            });
        }
        const { error, value } = blogValidator_1.BlogValidator.validate(req.body, { abortEarly: false });
        //getting the original value and validation error from JOI validation after successful validdation
        const { tittle, content } = value;
        if (error) {
            return res.status(401).json({
                message: "Validation Error",
                error: error.details.map(detail => detail.message)
            });
        }
        //checking if user is trying to update image field and 
        //only update the image field if truly an image file is sent and uplaoded successfully
        let image = blogPost.image;
        if (req.file) {
            const { data, errorMessage } = await (0, cloudinary_1.ImageToCloudinary)(image);
            if (errorMessage) {
                return res.status(500).json({
                    message: "Failed to upload image on cloudinary",
                    error: errorMessage
                });
            }
            image = data.secure_url;
        }
        const newBlogPost = await blogModel_1.BlogModel.findByIdAndUpdate(blogPostId, { tittle, content, image, editedBy: req.user.Id }, { new: true });
        return res.status(200).json({
            message: "Blog Post Updated Successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
};
exports.editBlogPost = editBlogPost;
const DeleteBlogPost = async (req, res) => {
    try {
        const id = req.user.id;
        const blogPostId = req.params.post_id;
        const blogPost = await blogModel_1.BlogModel.findById(blogPostId);
        if (blogPost) {
            return res.status(404)
                .json({
                message: "Not found",
                error: "The intended blog post is not found"
            });
        }
        await blogModel_1.BlogModel.findByIdAndUpdate();
        return res.status(200).json({
            message: "Blog Post Deleted Successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
};
exports.DeleteBlogPost = DeleteBlogPost;
const getBlogPost = async (req, res) => {
    try {
        const blogPostId = req.params.id;
        const blogPost = await blogModel_1.BlogModel.findById(blogPostId);
        if (!blogPost) {
            return res.status(404).json({
                message: "Not found",
                error: "The intended blog post is not found"
            });
        }
        return res.status(200).json({
            message: "Blog post retrieved successfully",
            blogPost
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
};
exports.getBlogPost = getBlogPost;
const getBlogPosts = async (req, res) => {
    try {
        const blogPosts = await blogModel_1.BlogModel.find();
        if (blogPosts.length < 1) {
            return res.status(404).json({
                message: "Not found",
                error: "No blog Post found"
            });
        }
        return res.status(200).json({
            message: "Blog posts retrieved successfully",
            blogPosts
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
};
exports.getBlogPosts = getBlogPosts;
