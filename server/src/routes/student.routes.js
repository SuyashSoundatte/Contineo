import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/role.middleware.js";
import { validStudent, validStudentDiv } from "../middlewares/student.middleware.js";
import { createStudent } from "../controllers/student.controller.js";

const router = Router();

// router.post("/createStudent", verifyToken, authRole("SuperAdmin", "OfficeStaff"), validStudent, createStudent)

//routes student
router.post('/createStudent', verifyToken, authRole("OfficeStaff", "SuperAdmin"), validStudent, createStudent)

router.post('/allocateStudentDiv', verifyToken, authRole("OfficeStaff", "SuperAdmin"), validStudentDiv, createStudent)

router.put('/allocateStudentDiv', verifyToken, authRole("OfficeStaff", "SuperAdmin"), validStudentDiv, updateStudent)

router.get('/getStudentsByDiv', verifyToken, authRole("OfficeStaff", "SuperAdmin"), validStudent, getStudentByDiv)

router.get('/getAllStudents', verifyToken, authRole("OfficeStaff", "SuperAdmin"), validStudent, getAllStudent)

router.get('/getStudentsByStd', verifyToken, authRole("OfficeStaff", "SuperAdmin"), validStudent, getStudentByStd)

router.get('/getAllocatedStudent', verifyToken, authRole("OfficeStaff", "SuperAdmin"), validStudent, getAllocatedStudent)



export default router