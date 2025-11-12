"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const ConnectDB = async (shouldDrop = false) => {
    try {
        await mongoose_1.default.connect(env_1.ENV.DB_URI);
        console.log("✅ MongoDB connected");
        if (shouldDrop) {
            // await mongoose.connection.dropDatabase();
            // console.log("⚠️ Database dropped successfully!");
        }
    }
    catch (error) {
        console.error("❌ Mongo connection error:", error);
    }
};
exports.ConnectDB = ConnectDB;
