import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/role.middleware.js";
import { assignClassTeacherByStdDiv } from "../controllers/teacher.controller.js";
import {markAttendance, getAttendanceByDateRange, getStudentAttendanceStats, updateAttendance} from "../controllers/attendace.controller.js";

const router = Router();

router.post('/assignClassTeacherByStdDiv', verifyToken, authRole("OfficeStaff", "SuperAdmin"), assignClassTeacherByStdDiv)

router.post('/attendaceStudent', verifyToken, authRole("ClassTeacher", "SuperAdmin"), markAttendance)

router.get('/attendance', verifyToken, authRole("ClassTeacher", "SuperAdmin"), getAttendanceByDateRange);

router.get('/attendance/student/:studentId', verifyToken, authRole("ClassTeacher", "SuperAdmin"), getStudentAttendanceStats);

router.put('/attendance/:attendanceId', verifyToken, authRole("ClassTeacher", "SuperAdmin"), updateAttendance);

export default router;