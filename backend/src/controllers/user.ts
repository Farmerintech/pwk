import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import UsersModel from "../models/UsersModel";
import mongoose from "mongoose";


dotenv.config();


interface AuthenticatedRequest extends Request {
  user?: JwtPayload & { id: string; role: string; status: string };
}




export const getUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.user?.id;

    if (!id) {
      return res.status(401).json({
        message: "Authorization error",
        error: "User ID missing from token payload",
      });
    }

    const user = await UsersModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "Authorization error",
        error: "Unable to find user",
        id,
      });
    }

    return res.status(200).json({
      message: "User retrieved Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};


export const getUsers = async (req:AuthenticatedRequest, res:Response) => {
  try {
    const users = await UsersModel.find();
    if(!users || users.length < 1){
      return res.status(404)
      .json({
        message:"No user found",
        error:"Unable to find users"
      });
    }
    return res.status(200)
    .json({
      message:"Users retrieved Successfully",
      users
    })
  } catch (error) {
    return res.status(500)
    .json({
      message:"Server Error",
      error
    })
  }
}


export const EditUser = async (req:AuthenticatedRequest, res:Response) => {
  try {
    const id = req.user?.id
    const user = await UsersModel.findById(id);
    if(!user){
      return res.status(404)
      .json({
        message:"Authorization error",
        error:"Unable to find user"
      });
    }
    const newUser = await UsersModel.findByIdAndUpdate(id, req.body, {new:true});
    return res.status(2000)
    .json({
      message:"User Updated Successfully",
      user
    })
  } catch (error) {
    return res.status(500)
    .json({
      message:"Server Error",
      error
    })
  }
}

export const DeleteUser = async (req:AuthenticatedRequest, res:Response) => {
  try {
    const id = req.user?.id
    const user = await UsersModel.findById(id);
    if(!user){
      return res.status(404)
      .json({
        message:"Authorization error",
        error:"Unable to find user"
      });
    }
    const newUser = await UsersModel.findByIdAndDelete(id);
    return res.status(2000)
    .json({
      message:"User Deleted Successfully",
      user
    })
  } catch (error) {
    return res.status(500)
    .json({
      message:"Server Error",
      error
    })
  }
}