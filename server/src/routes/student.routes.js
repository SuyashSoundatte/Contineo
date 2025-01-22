import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/role.middleware.js";
import asyncHandler  from "../config/asyncHandler.js";
import { executeQuery } from "../config/executeQuery.js";
import { validStudent, validStudentDiv, getStudentId } from "../middlewares/student.middleware.js";
import { createStudent, allocateStudentDiv, getStudentByStdDiv, updateStudent, getAllStudent, getStudentByStd, getAllocatedStudent, getStudentById, getStudentByDiv, assignStudentsToDivision } from "../controllers/student.controller.js";

const router = Router();

router.post("/createStudent", verifyToken, authRole("SuperAdmin", "OfficeStaff"), validStudent, createStudent)

router.post('/allocateStudentDiv', verifyToken, authRole("OfficeStaff", "SuperAdmin"), validStudentDiv, allocateStudentDiv)
router.put('/allocateStudentDiv', verifyToken, authRole("OfficeStaff", "SuperAdmin"), validStudentDiv, updateStudent)

router.get('/getAllStudents', verifyToken, authRole("OfficeStaff", "SuperAdmin"), getAllStudent)

router.get('/getStudentsByStd/:id', verifyToken, authRole("OfficeStaff", "SuperAdmin"), getStudentByStd)

router.get('/getStudentByStdDiv/:std/:div', verifyToken, authRole("Teacher", "SuperAdmin"), getStudentByStdDiv)

router.get('/getUnAllocatedStudent', verifyToken, authRole("OfficeStaff", "SuperAdmin"), getAllocatedStudent)

router.get('/getStudentByDiv/:div', verifyToken, authRole("OfficeStaff", "SuperAdmin"), getStudentByDiv)

router.get('/getStudentId/:id', verifyToken, authRole("OfficeStaff", "SuperAdmin"), getStudentById)

router.post('/assignMultipleStudentByDivStd', verifyToken, authRole("OfficeStaff", "SuperAdmin"), assignStudentsToDivision)



export default router