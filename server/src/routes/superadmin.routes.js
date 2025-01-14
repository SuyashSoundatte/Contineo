import { Router } from "express";
import { loginUser, getAllUsers, getUserById, logOutUser } from "../controllers/user.controller.js";
import { createUser } from "../controllers/superadmin.controller.js" 
import verifyToken  from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/role.middleware.js";
import { validUser , validLogin } from "../middlewares/superadmin.middleware.js";
import { getTeachers, getTeacherById } from "../controllers/teacher.controller.js";

const router = Router();

router.post("/createUser", verifyToken, authRole("SuperAdmin"), validUser, createUser);
router.post("/login", validLogin, loginUser);
router.get("/logout", logOutUser);
router.get("/getTeachers", verifyToken, authRole("SuperAdmin"), getTeachers);
router.get("/getTeacherById/:teacherId", verifyToken, authRole("SuperAdmin"), getTeacherById);

router.get('/getUsers', verifyToken, authRole("SuperAdmin"), getAllUsers);
router.get('/getUserById/:userId', verifyToken, authRole("SuperAdmin"), getUserById);

export default router;