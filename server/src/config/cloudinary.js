import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SEC_KEY
})

const uploadCloudinary = async(path)=>{
  try {
    if(!path) return null;
    const response = await cloudinary.uploader.upload(path, {
      resource_type: 'auto',
      filename_override: false,
    })

    console.log("file upload succesfully")
    return response;
  } catch (error) {
    fs.unlinkSync(path);
    console.log("file upload failed!")
  }
}

export default uploadCloudinary;