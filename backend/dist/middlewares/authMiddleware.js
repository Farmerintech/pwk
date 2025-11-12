"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminWare = exports.isSuspended = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: "Authentication error",
                message: "Please login to have access",
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, env_1.ENV.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                status: "Authentication error",
                message: "Invalid token",
            });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Internal server error from authMiddleware",
            error,
        });
    }
};
exports.authMiddleware = authMiddleware;
//isSuspended Middleware
const isSuspended = (req, res, next) => {
    try {
        const status = req.user?.status;
        if (status === "Suspended") {
            return res.status(401)
                .json({
                status: "Authorization Error",
                messge: "Your account has been Suspended, please contact Admin"
            });
        }
        next();
    }
    catch (error) {
        return res.status(500)
            .json({
            status: "Error",
            message: "Internal server error",
            error
        });
    }
};
exports.isSuspended = isSuspended;
const AdminWare = (req, res, next) => {
    try {
        const isAnAdmin = req.user?.role === "Admin" || "Super admin";
        if (!isAnAdmin) {
            return res.status(403)
                .json({
                status: "Access denied",
                messge: "Only an admin is allowed to perform this operation"
            });
        }
        next();
    }
    catch (error) {
        return res.status(500)
            .json({
            status: "Error",
            message: "Internal server error",
            error
        });
    }
};
exports.AdminWare = AdminWare;
