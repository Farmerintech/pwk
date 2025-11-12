"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/kycRoutes.ts
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const AuthRoute = express_1.default.Router();
AuthRoute.post("/register", auth_1.Register)
    .post("/user/login", auth_1.Login)
    .post("/admin/login", auth_1.adminLogin)
    .post("/reset_password", authMiddleware_1.authMiddleware, auth_1.resetPassword)
    .post("/forget_password", auth_1.forgetPsw)
    .post("/admin/add_admin", auth_1.addAdmin);
exports.default = AuthRoute;
