// routes/kycRoutes.ts
import express from "express";
import {
  Register,
  Login,
  adminLogin,
  resetPassword,
  forgetPsw,
  addAdmin,
} from "../controllers/auth";
import { authMiddleware } from "../middlewares/authMiddleware";

const AuthRoute = express.Router();
AuthRoute.post("/register", Register)
.post("/user/login", Login)
.post("/admin/login", adminLogin)
.post("/reset_password", authMiddleware, resetPassword)
.post("/forget_password", forgetPsw)
.post("/admin/add_admin", addAdmin)


export default AuthRoute;
