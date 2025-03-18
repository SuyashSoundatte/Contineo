import { Router } from 'express';
import {
  markUploadJee,
  markUploadNeet,
  markUploadCet
} from '../dummy/markUploadByExcelController.js';
import { upload } from '../middlewares/multer.middleware.js'; // Your Multer config

const router = Router();

router.post('/upload/jee', upload.single('file'), markUploadJee);
router.post('/upload/neet', upload.single('file'), markUploadNeet);
router.post('/upload/cet', upload.single('file'), markUploadCet);

export default router;
