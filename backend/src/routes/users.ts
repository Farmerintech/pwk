
import express from "express";
import { DeleteUser, EditUser, getUser, getUsers } from "../controllers/user";

const UserRoute = express.Router()
UserRoute.get("/get_user", getUser);
UserRoute.get("/get_users", getUsers);
UserRoute.post("/edit_user", EditUser);
UserRoute.delete("/delete_user", DeleteUser);


export default UserRoute;
