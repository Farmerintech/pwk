
import express from "express";
import { DeleteAdmin, EditAdmin, getAdmin, getAdmins, SuspendUser, unSuspendUser } from "../controllers/admin";

const AdminRoutes = express.Router()
AdminRoutes.get("/get_admin", getAdmin);
AdminRoutes.get("/get_admins", getAdmins);
AdminRoutes.post("/edit_admin", EditAdmin);
AdminRoutes.delete("/delete_admin", DeleteAdmin);
AdminRoutes.patch("/suspend", SuspendUser);
AdminRoutes.patch("/unsuspend", unSuspendUser);



export default AdminRoutes;
