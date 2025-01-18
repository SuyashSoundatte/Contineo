import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/role.middleware.js";
import { assignClassTeacherByStdDiv } from "../controllers/teacher.controller.js";
import markAttendance from "../controllers/attendace.controller.js";

const router = Router();

router.post('/assignClassTeacherByStdDiv', verifyToken, authRole("OfficeStaff", "SuperAdmin"), assignClassTeacherByStdDiv)

router.post('/attendaceStudent', verifyToken, authRole("ClassTeacher", "SuperAdmin"), markAttendance)

export default router;