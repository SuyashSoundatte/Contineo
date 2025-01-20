import { Router } from "express"
// import { uploadFile } from "../controllers/file.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";
import ApiResponse from "../config/ApiResponse.js";
const router = Router();

router.post('/upload', 
  verifyToken, 
  (req, res, next) => {
    next();
  },
  upload.array("documents", 10),
  (req, res) => {
    try {

      if (!req.files || req.files.length === 0) {
        return res.status(400).json(
          new ApiResponse(400, null, 'No files uploaded')
        );
      }

      const { userId } = req.body;

      return res.status(200).json(
        new ApiResponse(
          200, 
          { 
            userId,
            files: req.files.map(file => ({
              originalname: file.originalname,
              filename: file.filename,
              path: file.path,
              mimetype: file.mimetype,
              size: file.size
            })) 
          }, 
          'Files uploaded successfully'
        )
      );
    } catch (error) {
      // Error handling
      console.error('Upload error:', error);
      return res.status(500).json(
        new ApiResponse(500, null, error.message)
      );
    }
  }
);

export default router;