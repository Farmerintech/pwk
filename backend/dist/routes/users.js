"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const UserRoute = express_1.default.Router();
UserRoute.get("/get_user", authMiddleware_1.authMiddleware, user_1.getUser);
UserRoute.get("/get_users", user_1.getUsers);
UserRoute.put("/edit_user", user_1.EditUser);
UserRoute.delete("/delete_user", user_1.DeleteUser);
exports.default = UserRoute;
