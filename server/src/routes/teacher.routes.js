import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/role.middleware.js";
import { updateTeacherSubject, getAllTeacher, getTeacherById, getTeacherBySubject, getTeacherByStd, allocateTeacherSubject,assignMentorByStdDiv, assignClassTeacherByStdDiv } from "../controllers/teacher.controller.js";
import { validateCreateTeacherData } from "../middlewares/teacher.middleware.js";
import {addSubjectData, getSyllabus} from "../controllers/subject.controller.js"

const router = Router();

//routes teacher
router.post('/allocateTeacherSubject', verifyToken, authRole("OfficeStaff", "SuperAdmin"), allocateTeacherSubject)

// router.post("/creteTeacher", verifyToken, authRole("OfficeStaff", "SuperAdmin"), validateCreateTeacherData, createTeacher);

router.put('/allocateTeacherSubject', verifyToken, authRole("OfficeStaff", "SuperAdmin"),  updateTeacherSubject)

router.get('/getAllTeacher', verifyToken, authRole("OfficeStaff", "SuperAdmin"), getAllTeacher)

router.get('/getTeacherById/:id', verifyToken, authRole("OfficeStaff", "SuperAdmin"), getTeacherById)

// router.get('/getTeacherByStd/:std', verifyToken, authRole("OfficeStaff", "SuperAdmin"), getTeacherByStd)

router.get('/getTeacherBySubject/:sub', verifyToken, authRole("OfficeStaff", "SuperAdmin"), getTeacherBySubject)

router.post('/addSubjectData', verifyToken, authRole("Teacher", "SuperAdmin"), addSubjectData)

router.get("/getSyllabus", verifyToken, authRole("Teacher", "SuperAdmin"), getSyllabus)

export default router