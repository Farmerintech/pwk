"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unSuspendUser = exports.SuspendUser = exports.DeleteAdmin = exports.EditAdmin = exports.getAdmins = exports.getAdmin = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const UsersModel_1 = __importStar(require("../models/UsersModel"));
dotenv_1.default.config();
// const isAuthorized = (req: AuthenticatedRequest, targetWallet: string): boolean => {
//   return req.user?.walletAddress?.toLowerCase() === targetWallet.toLowerCase();
// };
const getAdmin = async (req, res) => {
    try {
        const id = req.user?.id;
        const user = await UsersModel_1.AdminModel.findById(id);
        if (!user) {
            return res.status(404)
                .json({
                message: "Authorization error",
                error: "Unable to find user"
            });
        }
        return res.status(2000)
            .json({
            message: "Admin retrieved Successfully",
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
exports.getAdmin = getAdmin;
const getAdmins = async (req, res) => {
    try {
        const admins = await UsersModel_1.AdminModel.find();
        if (!admins || admins.length < 1) {
            return res.status(404)
                .json({
                message: "No user found",
                error: "Unable to find users"
            });
        }
        return res.status(2000)
            .json({
            message: "Users retrieved Successfully",
            admins
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
exports.getAdmins = getAdmins;
const EditAdmin = async (req, res) => {
    try {
        const id = req.user?.id;
        const admin = await UsersModel_1.AdminModel.findById(id);
        if (!admin) {
            return res.status(404)
                .json({
                message: "Authorization error",
                error: "Unable to find user"
            });
        }
        const newUser = await UsersModel_1.AdminModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(2000)
            .json({
            message: "User Updated Successfully",
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
exports.EditAdmin = EditAdmin;
const DeleteAdmin = async (req, res) => {
    try {
        const id = req.user?.id;
        const admin = await UsersModel_1.AdminModel.findById(id);
        if (!admin) {
            return res.status(404)
                .json({
                message: "Authorization error",
                error: "Unable to find user"
            });
        }
        const newUser = await UsersModel_1.AdminModel.findByIdAndDelete(id);
        return res.status(2000)
            .json({
            message: "User Deleted Successfully",
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
exports.DeleteAdmin = DeleteAdmin;
const SuspendUser = async (req, res) => {
    try {
        const id = req.user?.id;
        const user = await UsersModel_1.default.findById(id) || await UsersModel_1.AdminModel.findById(id);
        if (!user) {
            return res.status(404)
                .json({
                message: "Authorization error",
                error: "Unable to find user"
            });
        }
        //check if not already suspended.
        let isSuspended = user?.status === "Suspended";
        if (isSuspended) {
            return res.status(403)
                .json({
                message: "This user is already suspended",
            });
        }
        const newUser = await UsersModel_1.AdminModel.findByIdAndUpdate(id, { status: "Suspended" }, { new: true });
        return res.status(2000)
            .json({
            message: "User Suspended Successfully",
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
exports.SuspendUser = SuspendUser;
const unSuspendUser = async (req, res) => {
    try {
        const id = req.user?.id;
        const user = await UsersModel_1.default.findById(id) || await UsersModel_1.AdminModel.findById(id);
        if (!user) {
            return res.status(404)
                .json({
                message: "Authorization error",
                error: "Unable to find user"
            });
        }
        //check if not already suspended.
        let isactive = user?.status === "Active";
        if (isactive) {
            return res.status(403)
                .json({
                message: "This user is already Reinstated",
            });
        }
        const newUser = await UsersModel_1.AdminModel.findByIdAndUpdate(id, { status: "Active" }, { new: true });
        return res.status(2000)
            .json({
            message: "User Reinstated Successfully",
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
exports.unSuspendUser = unSuspendUser;
