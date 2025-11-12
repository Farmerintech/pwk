"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = exports.EditUser = exports.getUsers = exports.getUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const UsersModel_1 = __importDefault(require("../models/UsersModel"));
dotenv_1.default.config();
const getUser = async (req, res) => {
    try {
        const id = req.user?.id;
        if (!id) {
            return res.status(401).json({
                message: "Authorization error",
                error: "User ID missing from token payload",
            });
        }
        const user = await UsersModel_1.default.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "Authorization error",
                error: "Unable to find user",
                id,
            });
        }
        return res.status(200).json({
            message: "User retrieved Successfully",
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};
exports.getUser = getUser;
const getUsers = async (req, res) => {
    try {
        const users = await UsersModel_1.default.find();
        if (!users || users.length < 1) {
            return res.status(404)
                .json({
                message: "No user found",
                error: "Unable to find users"
            });
        }
        return res.status(200)
            .json({
            message: "Users retrieved Successfully",
            users
        });
    }
    catch (error) {
        return res.status(500)
            .json({
            message: "Server Error",
            error
        });
    }
};
exports.getUsers = getUsers;
const EditUser = async (req, res) => {
    try {
        const id = req.user?.id;
        const user = await UsersModel_1.default.findById(id);
        if (!user) {
            return res.status(404)
                .json({
                message: "Authorization error",
                error: "Unable to find user"
            });
        }
        const newUser = await UsersModel_1.default.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(2000)
            .json({
            message: "User Updated Successfully",
            user
        });
    }
    catch (error) {
        return res.status(500)
            .json({
            message: "Server Error",
            error
        });
    }
};
exports.EditUser = EditUser;
const DeleteUser = async (req, res) => {
    try {
        const id = req.user?.id;
        const user = await UsersModel_1.default.findById(id);
        if (!user) {
            return res.status(404)
                .json({
                message: "Authorization error",
                error: "Unable to find user"
            });
        }
        const newUser = await UsersModel_1.default.findByIdAndDelete(id);
        return res.status(2000)
            .json({
            message: "User Deleted Successfully",
            user
        });
    }
    catch (error) {
        return res.status(500)
            .json({
            message: "Server Error",
            error
        });
    }
};
exports.DeleteUser = DeleteUser;
