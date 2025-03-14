import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadMarks } from "./marks.js";

const router = Router();

router.post("/upload", upload.single("marks"), uploadMarks);

export default router;
