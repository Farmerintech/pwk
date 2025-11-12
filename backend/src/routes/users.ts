
import express from "express";
import { DeleteUser, EditUser, getUser, getUsers } from "../controllers/user";
import { authMiddleware } from "../middlewares/authMiddleware";

const UserRoute = express.Router()
UserRoute.get("/get_user", authMiddleware, getUser);
UserRoute.get("/get_users", authMiddleware, getUsers);
UserRoute.put("/edit_user", EditUser);
UserRoute.delete("/delete_user", DeleteUser);


export default UserRoute;
