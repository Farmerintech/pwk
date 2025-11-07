import { Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt"
import jwt, {JwtPayload} from "jsonwebtoken";
import { ENV } from "../config/env";
import { AuthValidator, loginValidator, resetPasswordValidator } from "../validators/AuthValidator";
import UsersModel, { AdminModel } from "../models/UsersModel";
import { SendMail } from "../services/mail";

dotenv.config();

export const Register = async (req: Request, res: Response) => {
    try {
      const { error, value } = AuthValidator.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        error: error.details.map(detail => detail.message),
      });
      return; // 
    }

      const { name, gender, LGA, DOB, email, password, phoneNumber, 
        gameOfChoice, preferedName, profilePicture } = value;
      // Check if user already exists with the provided wallet address
      const existingUser = await UsersModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email address already registered" });
      }
  
      // Generate a unique KYC ID
      const uniqueId = `PWK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user entry
      const newUser = new UsersModel(
        {
          name, gender, LGA, DOB, email, password, phoneNumber, 
          gameOfChoice, preferedName, profilePicture, uniqueId
        }
      );
  
      await newUser.save();
  
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error saving User" });
    }
  };
  
export const Login = async (req: Request, res: Response) => {
  try {
    const { error, value } = loginValidator.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        error: error.details.map(detail => detail.message),
      });
    }
      //get the value after from Joi after successful validation
    const {email, password} = value;
    // Fetch user 
    const user: any = await UsersModel.findOne({ email });
    // No user found
    if (!user) {
      return res.status(404).json({
        message: 'Validation failed',
        error: "Wrong Email address",
      });
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(401).json({
        message: 'Validation failed',
        error: "Incorrect password",
      });
    }

    // Build payload
    const payLoad = {
      id: user.id,
      role: user.role
    };

    const token = jwt.sign(payLoad, ENV.JWT_SECRET, {
      expiresIn: "11d",
    });

    return res.status(200).json({
      message: "Login successful",
      isLoggedIn: true,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error
    });
  }
};

export const adminLogin = async (req:Request, res:Response) =>{
  try {
    const { error, value } = loginValidator.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        error: error.details.map(detail => detail.message),
      });
    }
      //get the value after from Joi after successful validation
    const {email, password} = value;
    const admin:any = AdminModel.findOne({email});
    if(!admin){
      return res.status(404).json({
        message:"Validation Error",
        error:"Wrong email"
      })
    }
    const matched = await bcrypt.compare(password, ENV.ADMIN_PASSWORD);
    if(!matched){
       return res.status(404).json({
        message:"Validation Error",
        error:"Incorrect Password"
      })
    }
    // Build payload
    const payLoad = {
      id: admin?.id,
      role: "admin"
    };

    const token = jwt.sign(payLoad, ENV.JWT_SECRET, {
      expiresIn: "11d",
    });

    return res.status(200).json({
      message: "Login successful",
      isLoggedIn: true,
      token,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error
    });
  }
}

export const addAdmin = async (req:Request, res:Response) =>{
  try {
    const {email} = req.body;
    const password = `PWK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    //make we check ifte email no exists before oo
    const checkFirst = await AdminModel.findOne({email});
    if(checkFirst){
      return res.status(403).json({
        message:"Forbidden",
        error:"This email is already in use by an admin."
      });
    }
     const user = await UsersModel.findOne({email});
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
     const newAdmin = new AdminModel(
        {
          email,
          password:hashedPassword,
          name:user.name || null
        }
      );
    await newAdmin.save();
    const message =
      `Dear Kwaran, we are thrilled to announce to you that you have been make one of the Play with kwaran youth community Admins. 
       <br/> Find attached below are the login detils to the <a href="https://pwky/admin/login">admin dashbord</a>`;
    const tittle = 'Community Admin';
    const url:any='';
    const html= 
     `
        <div>
          <p>Dear Kwaran</p>
          <p>${message}</p>
          <ul>
           <li>${url}</li>
           <li>${email}</li>
           <li>${password}</li>
          </ul>
        <p>Regards. Play with kwara Youth 2026</p>
        </div>
      `;
    SendMail(email, tittle, html);
  } catch (error) {
    return res.status(500).json({
        message:"Server Error",
        error:error
      })
  }
}
interface authenticatedRequest extends Request{
    user?: any | JwtPayload
}
export const resetPassword = async (req:authenticatedRequest, res:Response) =>{
  try {
    const role = req?.user?.role
    const email = req.user.email
    const { error, value } = resetPasswordValidator.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        error: error.details.map(detail => detail.message),
      });
    }
      //get the value after from Joi after successful validation
    const {oldPsw, newPsw} = value
    const user:any = await UsersModel.findOne({email}) || await AdminModel.findOne({email});
    if(!user){
      return res.status(404).json({
        message: 'Not found',
        error:"Incorrect mail",
      });
    }
    if(!oldPsw){
      return res.status(403).json({
        message: 'aunthentication error',
        error:"Incorrect old Password",
      });
    }
    const matched = await bcrypt.compare(user.paswword, oldPsw);
    if(!matched){
      return res.status(401).json({
        message: 'Unauthorized',
        error:"Incorrect old Password",
      });
    }
        //let update the passsword field with new password
    if(user.role == "user"){
      await UsersModel.findOneAndUpdate({email}, {password:newPsw}, {new:true})
    }
    if(user.role == "admin" || user.role == "super admin"){
      await AdminModel.findOneAndUpdate({email}, {password:newPsw}, {new:true})
    }
  } catch (error) {
     return res.status(500).json({
        message:"Server Error",
        error:error
      })
  }
}


export const forgetPsw = async (req:Request, res:Response) =>{
  try {
    const email = req.body
    if(!email){
       return res.status(404).json({
        message: 'Missing field',
        error:"Email is required",
      });
    }
    const user = await UsersModel.findOne({email}) || await AdminModel.findOne({email});
    if(!user){
       return res.status(404).json({
        message: 'Not found',
        error:"Incorrect mail",
      });
    }
    const password = `PWK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const name:any = user.name;
    const tittle = "password Reset"
    const html = 
    `
      <div>Dear ${name}, we  receive your request on password 
      reset and below is a new password to login to your dashboard</div>
      <p>${password}</p>
    `
    SendMail(email, tittle, html);
    //let update the passsword field with new generated password
    if(user.role == "user"){
      await UsersModel.findOneAndUpdate({email}, {password}, {new:true})
    }
    if(user.role == "admin"){
      await AdminModel.findOneAndUpdate({email}, {password}, {new:true})
    }
  } catch (error) {
     return res.status(500).json({
        message:"Server Error",
        error:error
      })
  }
}

export const createAdmin = async (req:Request, res:Response) =>{
  try {
    const email = ENV.ADMIN_Email;
    const password = ENV.ADMIN_PASSWORD;
    const superAdmin = new AdminModel({
      email,
      password,
      role:"super admin"
    });
    superAdmin.save();
  } catch (error) {
     return res.status(500).json({
        message:"Server Error",
        error:error
      })
  }
}

createAdmin;