import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import UsersModel, { AdminModel } from "../models/UsersModel";


dotenv.config();


interface AuthenticatedRequest extends Request {
  user?: any | JwtPayload;
}

// const isAuthorized = (req: AuthenticatedRequest, targetWallet: string): boolean => {
//   return req.user?.walletAddress?.toLowerCase() === targetWallet.toLowerCase();
// };

export const getAdmin = async (req:AuthenticatedRequest, res:Response) => {
  try {
    const id = req.user?.id
    const user = await AdminModel.findById(id);
    if(!user){
      return res.status(404)
      .json({
        message:"Authorization error",
        error:"Unable to find user"
      });
    }
    return res.status(2000)
    .json({
      message:"Admin retrieved Successfully",
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


export const getAdmins = async (req:AuthenticatedRequest, res:Response) => {
  try {
    const admins = await AdminModel.find();
    if(!admins || admins.length < 1){
      return res.status(404)
      .json({
        message:"No user found",
        error:"Unable to find users"
      });
    }
    return res.status(2000)
    .json({
      message:"Users retrieved Successfully",
      admins
    })
  } catch (error) {
    return res.status(500)
    .json({
      message:"Server Error",
      error
    })
  }
}


export const EditAdmin = async (req:AuthenticatedRequest, res:Response) => {
  try {
    const id = req.user?.id
    const admin = await AdminModel.findById(id);
    if(!admin){
      return res.status(404)
      .json({
        message:"Authorization error",
        error:"Unable to find user"
      });
    }
    const newUser = await AdminModel.findByIdAndUpdate(id, req.body, {new:true});
    return res.status(2000)
    .json({
      message:"User Updated Successfully",
    })
  } catch (error) {
    return res.status(500)
    .json({
      message:"Server Error",
      error
    })
  }
}

export const DeleteAdmin = async (req:AuthenticatedRequest, res:Response) => {
  try {
    const id = req.user?.id
    const admin = await AdminModel.findById(id);
    if(!admin){
      return res.status(404)
      .json({
        message:"Authorization error",
        error:"Unable to find user"
      });
    }
    const newUser = await AdminModel.findByIdAndDelete(id);
    return res.status(2000)
    .json({
      message:"User Deleted Successfully",
    })
  } catch (error) {
    return res.status(500)
    .json({
      message:"Server Error",
      error
    })
  }
}


export const SuspendUser = async (req:AuthenticatedRequest, res:Response) => {
  try {
    const id = req.user?.id
    const user = await UsersModel.findById(id) || await AdminModel.findById(id) 
    if(!user){
      return res.status(404)
      .json({
        message:"Authorization error",
        error:"Unable to find user"
      });
    }
    //check if not already suspended.
    let isSuspended = user?.status ==="Suspended"
    if(isSuspended){
        return res.status(403)
        .json({
            message:"This user is already suspended",
        })
    }
    const newUser = await AdminModel.findByIdAndUpdate(id, {status:"Suspended"}, {new:true});
    return res.status(2000)
    .json({
      message:"User Suspended Successfully",
    })
  } catch (error) {
    return res.status(500)
    .json({
      message:"Server Error",
      error
    })
  }
}


export const unSuspendUser = async (req:AuthenticatedRequest, res:Response) => {
  try {
    const id = req.user?.id
    const user = await UsersModel.findById(id) || await AdminModel.findById(id) 
    if(!user){
      return res.status(404)
      .json({
        message:"Authorization error",
        error:"Unable to find user"
      });
    }
    //check if not already suspended.
    let isactive = user?.status ==="Active"
    if(isactive){
        return res.status(403)
        .json({
            message:"This user is already Reinstated",
        })
    }
    const newUser = await AdminModel.findByIdAndUpdate(id, {status:"Active"}, {new:true});
    return res.status(2000)
    .json({
      message:"User Reinstated Successfully",
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