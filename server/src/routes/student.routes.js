import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/role.middleware.js";
import { validStudent, validStudentDiv, getStudentId } from "../middlewares/student.middleware.js";
import { createStudent, allocateStudentDiv, updateStudent, getAllStudent, getStudentByStd, getAllocatedStudent } from "../controllers/student.controller.js";

const router = Router();

// router.post('/createStudent', validStudent, createStudent)

//routes student
router.post("/createStudent", verifyToken, authRole("SuperAdmin", "OfficeStaff"), validStudent, createStudent)

router.post('/allocateStudentDiv', verifyToken, authRole("OfficeStaff", "SuperAdmin"), validStudentDiv, allocateStudentDiv)

router.put('/allocateStudentDiv', verifyToken, authRole("OfficeStaff", "SuperAdmin"), validStudentDiv, updateStudent)

router.get('/getAllStudents', verifyToken, authRole("OfficeStaff", "SuperAdmin"), getAllStudent)

router.get('/getStudentsByStd/:id', verifyToken, authRole("OfficeStaff", "SuperAdmin"), getStudentByStd)

router.get('/getAllocatedStudent', verifyToken, authRole("OfficeStaff", "SuperAdmin"), getAllocatedStudent)


export default router