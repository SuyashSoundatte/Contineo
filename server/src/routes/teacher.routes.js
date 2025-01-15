// import { Router } from "express";
// import verifyToken from "../middlewares/auth.middleware.js";
// import authRole from "../middlewares/role.middleware.js";

// const router = Router();

// //routes teacher
// router.post('/allocateTeacherSubject', verifyToken, authRole("OfficeStaff", "SuperAdmin"), validTeacherData, allocateTeacherSubject)

// router.put('/allocateTeacherSubject', verifyToken, authRole("OfficeStaff", "SuperAdmin"), validTeacherData, updateTeacherSubject)

// router.post('/allocateTeacherDivStd', verifyToken, authRole("OfficeStaff", "SuperAdmin"), validTeacherData, allocateTeacherDivStd)

// router.put('/allocateTeacherDivStd', verifyToken, authRole("OfficeStaff", "SuperAdmin"), validTeacherData, updateTeacherDivStd)


// export default router