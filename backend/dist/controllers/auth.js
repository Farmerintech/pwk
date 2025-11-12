"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPsw = exports.resetPassword = exports.addAdmin = exports.adminLogin = exports.Login = exports.Register = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const AuthValidator_1 = require("../validators/AuthValidator");
const UsersModel_1 = __importStar(require("../models/UsersModel"));
const mail_1 = require("../services/mail");
dotenv_1.default.config();
const Register = async (req, res) => {
    try {
        const { error, value } = AuthValidator_1.AuthValidator.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                error: error.details.map(detail => detail.message),
            });
        }
        const { name, gender, LGA, DOB, email, password, phoneNumber, preferedName, } = value;
        // Check if user already exists with the provided wallet address
        const existingUser = await UsersModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email address already registered" });
        }
        // Generate a unique KYC ID
        const uniqueId = `PWK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        // Create a new user entry
        const newUser = new UsersModel_1.default({
            name, gender, LGA, DOB, email, password: hashedPassword, phoneNumber,
            preferedName, uniqueId
        });
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error saving User" });
    }
};
exports.Register = Register;
const Login = async (req, res) => {
    try {
        const { error, value } = AuthValidator_1.loginValidator.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: 'Validation failed',
                error: error.details.map(detail => detail.message),
            });
        }
        //get the value after from Joi after successful validation
        const { email, password } = value;
        // Fetch user 
        const user = await UsersModel_1.default.findOne({ email });
        // No user found
        if (!user) {
            return res.status(404).json({
                message: 'Validation failed',
                error: "Wrong Email address",
            });
        }
        const matched = await bcrypt_1.default.compare(password, user.password);
        if (!matched) {
            return res.status(401).json({
                message: 'Validation failed',
                error: "Incorrect password",
            });
        }
        // Build payload
        const payLoad = {
            id: user._id,
            role: user.role,
            status: user.status
        };
        const token = jsonwebtoken_1.default.sign(payLoad, env_1.ENV.JWT_SECRET, {
            expiresIn: "11d",
        });
        return res.status(200).json({
            message: "Login successful",
            isLoggedIn: true,
            id: user._id,
            role: user.role,
            token,
        });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Server error",
            error: error
        });
    }
};
exports.Login = Login;
const adminLogin = async (req, res) => {
    try {
        const { error, value } = AuthValidator_1.loginValidator.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                error: error.details.map(detail => detail.message),
            });
        }
        //  const SuperEmail = ENV.ADMIN_EMAIL;
        // const superAdminMail :any = await AdminModel.findOne({SuperEmail});
        // if(!superAdminMail){
        // const salt = await bcrypt.genSalt(10) 
        // const SuperPassword = await bcrypt.hash(ENV.ADMIN_PASSWORD, salt);
        // const superAdmin = new AdminModel({
        //   email:SuperEmail,
        //   password:SuperPassword,
        //   role:"super admin"
        // });
        // superAdmin.save();
        // }
        //get the value after from Joi after successful validation
        const { email, password } = value;
        const admin = await UsersModel_1.AdminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({
                message: "Validation Error",
                error: "Wrong email"
            });
        }
        const matched = await bcrypt_1.default.compare(password, admin?.password);
        if (!matched) {
            return res.status(404).json({
                message: "Validation Error",
                error: "Incorrect Password"
            });
        }
        // Build payload
        const payLoad = {
            id: admin?.id,
            role: "admin"
        };
        const token = jsonwebtoken_1.default.sign(payLoad, env_1.ENV.JWT_SECRET, {
            expiresIn: "11d",
        });
        return res.status(200).json({
            message: "Login successful",
            isLoggedIn: true,
            token,
            role: "admin"
        });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Server error",
            error: error
        });
    }
};
exports.adminLogin = adminLogin;
const addAdmin = async (req, res) => {
    try {
        const { email } = req.body;
        const password = `PWK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        //make we check ifte email no exists before oo
        const checkFirst = await UsersModel_1.AdminModel.findOne({ email });
        if (checkFirst) {
            return res.status(403).json({
                message: "Forbidden",
                error: "This email is already in use by an admin."
            });
        }
        const user = await UsersModel_1.default.findOne({ email });
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const newAdmin = new UsersModel_1.AdminModel({
            email,
            password: hashedPassword,
            name: user.name || null
        });
        await newAdmin.save();
        const message = `Dear Kwaran, we are thrilled to announce to you that you have been make one of the Play with kwaran youth community Admins. 
       <br/> Find attached below are the login detils to the <a href="https://pwky/admin/login">admin dashbord</a>`;
        const tittle = 'Community Admin';
        const url = '';
        const html = `
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
        (0, mail_1.SendMail)(email, tittle, html);
    }
    catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error
        });
    }
};
exports.addAdmin = addAdmin;
const resetPassword = async (req, res) => {
    try {
        const role = req?.user?.role;
        const email = req.user.email;
        const { error, value } = AuthValidator_1.resetPasswordValidator.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                error: error.details.map(detail => detail.message),
            });
        }
        //get the value after from Joi after successful validation
        const { oldPsw, newPsw } = value;
        const user = await UsersModel_1.default.findOne({ email }) || await UsersModel_1.AdminModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'Not found',
                error: "Incorrect mail",
            });
        }
        if (!oldPsw) {
            return res.status(403).json({
                message: 'aunthentication error',
                error: "Incorrect old Password",
            });
        }
        const matched = await bcrypt_1.default.compare(user.paswword, oldPsw);
        if (!matched) {
            return res.status(401).json({
                message: 'Unauthorized',
                error: "Incorrect old Password",
            });
        }
        //let update the passsword field with new password
        if (user.role == "user") {
            await UsersModel_1.default.findOneAndUpdate({ email }, { password: newPsw }, { new: true });
        }
        if (user.role == "admin" || user.role == "super admin") {
            await UsersModel_1.AdminModel.findOneAndUpdate({ email }, { password: newPsw }, { new: true });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error
        });
    }
};
exports.resetPassword = resetPassword;
const forgetPsw = async (req, res) => {
    try {
        const email = req.body;
        if (!email) {
            return res.status(404).json({
                message: 'Missing field',
                error: "Email is required",
            });
        }
        const user = await UsersModel_1.default.findOne({ email }) || await UsersModel_1.AdminModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'Not found',
                error: "Incorrect mail",
            });
        }
        const password = `PWK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const name = user.name;
        const tittle = "password Reset";
        const html = `
      <div>Dear ${name}, we  receive your request on password 
      reset and below is a new password to login to your dashboard</div>
      <p>${password}</p>
    `;
        (0, mail_1.SendMail)(email, tittle, html);
        //let update the passsword field with new generated password
        if (user.role == "user") {
            await UsersModel_1.default.findOneAndUpdate({ email }, { password }, { new: true });
        }
        if (user.role == "admin") {
            await UsersModel_1.AdminModel.findOneAndUpdate({ email }, { password }, { new: true });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error
        });
    }
};
exports.forgetPsw = forgetPsw;
