import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/authRole.middleware.js";
import validStudent from "../middlewares/student.middleware.js";

const router = Router();

router.post("/createStudent", verifyToken, authRole("SuperAdmin", "OfficeStaff"), validStudent, createStudent)