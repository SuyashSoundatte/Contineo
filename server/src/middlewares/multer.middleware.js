import multer from "multer"
import ApiError from "../config/ApiError.js"

const storage = multer.diskStorage({
  destination:function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename:function(req, file, cb){
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})

export { upload }
