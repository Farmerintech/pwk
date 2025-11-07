import dotenv from "dotenv";
dotenv.config();

const requiredVars = ["DB_URI", "ADMIN_PASSWORD", "JWT_SECRET", "GMAIL_PASS", "GMAIL_USER", "ADMIN_Email", "UPLOAD_PRESET", "CLOUDINARY_CLOUD_NAME"] as const;

requiredVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing ${key} in environment variables.`);
  }
});

export const ENV = {
  DB_URI: process.env.DB_URI as string,
  CONTRACT_ADDRESS:process.env.CONTRACT_ADDRESS as string,
  RPC_URL:process.env.RPC_URL,
  JWT_SECRET: process.env.JWT_SECRET as string,
  ADMIN_PASSWORD:process.env.ADMIN_PASSWORD as string,
  ADMIN_Email:process.env.ADMIN_PASSWORD as string,
  GMAIL_PASS:process.env.GMAIL_PASS as string,
  GMAIL_USER:process.env.USER as string,
  CORS_ORIGIN: process.env.CORS_ORIGIN || process.env.CLIENT_URL || "http://localhost:8081",
  CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
  UPLOAD_PRESET:process.env.UPLOAD_PRESET
};
