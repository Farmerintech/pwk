import { Request, Response } from "express";
import { BlogValidator } from "../validators/blogValidator";
import { BlogModel } from "../models/blogModel";
import { ENV } from "../config/env";
import  { JwtPayload } from "jsonwebtoken";
import { ImageToCloudinary } from "../services/cloudinary";

interface AuthenticatedRequest extends Request {
  user?: any | JwtPayload;
}
export const AddBlogPost = async (req:AuthenticatedRequest, res:Response) =>{
    try {
        const {error, value} = BlogValidator.validate(req.body, {abortEarly:false});
        const {tittle, content} = value;
        if(error){
            return res.status(401).json({
                message:"Validation Error",
                error:error.details.map(detail=>detail.message)
            })
        }
        //save directory to cloudinary and use save the image url to db
          const image = req.file
          if(!image){
             return res.status(401).json({
                message:"Validation Error",
                error:"No image file"
            })
          }
          //gettinng data and error mesage from cludinary helper function i created
          const {data, errorMessage} = await ImageToCloudinary(image);
          if(errorMessage){
            return res.status(500).json({
              message:"Failed to upload image on cloudinary",
              error:errorMessage
            });
          }
        const newBlogPost = new BlogModel({
            tittle,
            content,
            image:data.secure_url,
            postedBy:req.user.id
        });
        newBlogPost.save();
    } catch (error) {
        return res.status(500).json({
            message:"Validation Error",
            error:error
        })
    }
}


export const editBlogPost = 
async (req:AuthenticatedRequest, res:Response) =>{
  try {
    const id = req.user.id
    const blogPostId = req.params.post_id
    const blogPost = await BlogModel.findById(blogPostId);
    if(blogPost){
      return res.status(404)
      .json({
        message:"Not found",
        error:"The intended blog post is not found"
      });
    }
    const {error, value} = BlogValidator.validate(req.body, {abortEarly:false});
    //getting the original value and validation error from JOI validation after successful validdation
    const {tittle, content} = value;
    if(error){
          return res.status(401).json({
            message:"Validation Error",
            error:error.details.map(detail=>detail.message)
          })
      }
      //checking if user is trying to update image field and 
      //only update the image field if truly an image file is sent and uplaoded successfully
    let image = blogPost.image
    if(req.file){
      const {data, errorMessage} = await ImageToCloudinary(image);
      if(errorMessage){
        return res.status(500).json({
          message:"Failed to upload image on cloudinary",
          error:errorMessage
        });
      }
      image = data.secure_url;
    }
      const newBlogPost = await BlogModel.findByIdAndUpdate(
        blogPostId, 
        {tittle, content, image, editedBy:req.user.Id}, 
        {new:true}
      )
      return res.status(200).json({
        message:"Blog Post Updated Successfully"
      })
  } catch (error) {
    return res.status(500).json({
      message:"Internal server error",
      error:error
    })
  }
}


export const DeleteBlogPost = 
async (req:AuthenticatedRequest, res:Response) =>{
  try {
    const id = req.user.id
    const blogPostId = req.params.post_id
    const blogPost = await BlogModel.findById(blogPostId);
    if(blogPost){
      return res.status(404)
      .json({
        message:"Not found",
        error:"The intended blog post is not found"
      });
    }
     await BlogModel.findByIdAndUpdate()
      return res.status(200).json({
        message:"Blog Post Deleted Successfully"
      })
  } catch (error) {
    return res.status(500).json({
      message:"Internal server error",
      error:error
    })
  }
}

export const getBlogPost = async (req:Request, res:Response) =>{
  try {
    const blogPostId = req.params.id
    const blogPost = await BlogModel.findById(blogPostId);
    if(!blogPost){
      return res.status(404).json({
        message:"Not found",
        error:"The intended blog post is not found"
      });
    }
    return res.status(200).json({
      message:"Blog post retrieved successfully",
      blogPost
    })
  } catch (error) {
    return res.status(500).json({
      message:"Internal server error",
      error:error
    })
  }
}

export const getBlogPosts = async (req:Request, res:Response) =>{
  try {
    const blogPosts = await BlogModel.find();
    if(blogPosts.length < 1){
      return res.status(404).json({
        message:"Not found",
        error:"No blog Post found"
      });
    }
    return res.status(200).json({
      message:"Blog posts retrieved successfully",
      blogPosts
    })
  } catch (error) {
    return res.status(500).json({
      message:"Internal server error",
      error:error
    })
  }
}