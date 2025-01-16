import { Router } from "express";
import { loginUser, getAllUsers, getUserById, logOutUser, getAllMentors, getAllClassTeacher } from "../controllers/user.controller.js";
import { createUser } from "../controllers/superadmin.controller.js" 
import verifyToken  from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/role.middleware.js";
import { validUser , validLogin } from "../middlewares/superadmin.middleware.js";

const router = Router();

router.post("/register", validUser, createUser);

router.post("/createUser", verifyToken, authRole("SuperAdmin"), validUser, createUser);
router.post("/login", validLogin, loginUser);
router.get("/logout", logOutUser);


router.get('/getUsers', verifyToken, authRole("SuperAdmin"), getAllUsers);
router.get('/getUserById/:userId', verifyToken, authRole("SuperAdmin"), getUserById);

router.get('/getAllMentors', verifyToken, authRole("SuperAdmin"), getAllMentors);
router.get('/getAllClassTeacher', verifyToken, authRole("SuperAdmin"), getAllClassTeacher);


export default router;