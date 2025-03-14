import { Router } from "express";
import { createStu, getStuByRoll } from "./student.js";
import { parentLogin } from "./parentLogin.js"
import verifyToken from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/role.middleware.js";
import { validLogin } from "../middlewares/superadmin.middleware.js";

const router = Router();

router.post("/students", verifyToken, authRole("SuperAdmin"), createStu);
router.get("/getStuByRoll/:roll_no", getStuByRoll)

router.post("/parentLogin", parentLogin)

export default router;
