"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controllers/admin");
const AdminRoutes = express_1.default.Router();
AdminRoutes.get("/get_admin", admin_1.getAdmin);
AdminRoutes.get("/get_admins", admin_1.getAdmins);
AdminRoutes.post("/edit_admin", admin_1.EditAdmin);
AdminRoutes.delete("/delete_admin", admin_1.DeleteAdmin);
AdminRoutes.patch("/suspend", admin_1.SuspendUser);
AdminRoutes.patch("/unsuspend", admin_1.unSuspendUser);
exports.default = AdminRoutes;
