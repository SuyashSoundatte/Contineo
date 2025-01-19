import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/role.middleware.js";
import { assignMentorByStdDiv } from "../controllers/teacher.controller.js";
import {getAllMentor} from "../controllers/ct.controller.js";

const router = Router();

router.post('/assignMentorByStdDiv', verifyToken, authRole("OfficeStaff", "SuperAdmin"), assignMentorByStdDiv)

router.post('/getAllMentors', verifyToken, authRole("OfficeStaff", "SuperAdmin"), getAllMentor)

export default router;