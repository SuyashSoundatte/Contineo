import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/role.middleware.js";
import { allocateTeacherSubject, updateTeacherSubject, getAllTeacher, getTeacherById } from "../controllers/teacher.controller.js";
import { validTeacherData } from "../middlewares/teacher.middleware.js";

const router = Router();

//routes teacher
// router.post('/allocateTeacherSubject', verifyToken, authRole("OfficeStaff", "SuperAdmin"), validTeacherSub, allocateTeacherSubject)

router.put('/allocateTeacherSubject', verifyToken, authRole("OfficeStaff", "SuperAdmin"), validTeacherData, updateTeacherSubject)

router.get('/getAllTeacher', verifyToken, authRole("OfficeStaff", "SuperAdmin"), getAllTeacher)

router.get('/getTeacherById/:id', verifyToken, authRole("OfficeStaff", "SuperAdmin"), getTeacherById)
export default router