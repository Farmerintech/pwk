
import express from "express";
import { DeleteAdmin, EditAdmin, getAdmin, getAdmins, SuspendUser, unSuspendUser } from "../controllers/admin";
import { AdminWare, authMiddleware } from "../middlewares/authMiddleware";

const AdminRoutes = express.Router()
AdminRoutes.get("/get_admin", authMiddleware, AdminWare, getAdmin);
AdminRoutes.get("/get_admins", authMiddleware, getAdmins);
AdminRoutes.post("/edit_admin", authMiddleware,  EditAdmin);
AdminRoutes.delete("/delete_admin", authMiddleware, DeleteAdmin);
AdminRoutes.patch("/suspend", authMiddleware, SuspendUser);
AdminRoutes.patch("/unsuspend", authMiddleware, unSuspendUser);



export default AdminRoutes;
