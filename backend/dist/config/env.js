"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const requiredVars = ["DB_URI", "ADMIN_PASSWORD", "JWT_SECRET", "GMAIL_PASS",
    "GMAIL_USER", "ADMIN_EMAIL", "UPLOAD_PRESET", "CLOUDINARY_CLOUD_NAME"];
requiredVars.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing ${key} in environment variables.`);
    }
});
exports.ENV = {
    DB_URI: process.env.DB_URI,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    RPC_URL: process.env.RPC_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    GMAIL_PASS: process.env.GMAIL_PASS,
    GMAIL_USER: process.env.USER,
    CORS_ORIGIN: process.env.CORS_ORIGIN || process.env.CLIENT_URL || "http://localhost:8081",
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    UPLOAD_PRESET: process.env.UPLOAD_PRESET
};
