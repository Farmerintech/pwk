import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/env";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload & { id: string; role: string; status: string };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "Authentication error",
        message: "Please login to have access",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, ENV.JWT_SECRET) as JwtPayload & {
      id: string;
      role: string;
      status: string;
    };

    if (!decoded) {
      return res.status(401).json({
        status: "Authentication error",
        message: "Invalid token",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: "Internal server error from authMiddleware",
      error,
    });
  }
};

//isSuspended Middleware
export const isSuspended = (req:AuthenticatedRequest, res:Response, next:NextFunction) =>{
    try {
        const status = req.user?.status;
        if(status === "Suspended"){
            return res.status(401)
            .json({
                status:"Authorization Error",
                messge:"Your account has been Suspended, please contact Admin"
            })
        }
        next();
    } catch (error) {
        return res.status(500)
        .json({
            status:"Error",
            message:"Internal server error",
            error
        })
    }
}

export const AdminWare = (req:AuthenticatedRequest, res:Response, next:NextFunction) =>{
    try {
        const isAnAdmin = req.user?.role=== "Admin" || "Super admin";
        if(!isAnAdmin){
            return res.status(403)
            .json({
                status:"Access denied",
                messge:"Only an admin is allowed to perform this operation"
            }) 
        }
        next();
    } catch (error) {
       return res.status(500)
        .json({
            status:"Error",
            message:"Internal server error",
            error
        })  
    }
}