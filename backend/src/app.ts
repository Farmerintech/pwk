import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import {ConnectDB} from "./config/db"
import UserRoute from "./routes/users";
import AuthRoute from "./routes/auth";
import AdminRoutes from "./routes/admin";
import BlogRoutes from "./routes/blog";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

ConnectDB();

app.use("/api/user", UserRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/admin", AdminRoutes)
app.use("/api/blog", BlogRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  
