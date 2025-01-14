import ApiError from "../config/ApiError.js"
import ApiResponse from "../config/ApiResponse.js"
import asyncHandler from "../config/asyncHandler.js"
import uploadCloudinary from "../config/cloudinary.js"

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const uploadFile = asyncHandler(async(req, res)=>{
  const data = req.body;
  const { jsonData } = data;
  const { filename, teacherId } = await JSON.parse(jsonData);
  const  filePath  = req.file?.path;

  if(!filename || !teacherId){
    throw new ApiError(400, "All fields are required!");
  }

  if(!filePath){
    throw new ApiError(400, "File is missing");
  }

  const file = await uploadCloudinary(filePath);

  const parsedTeacherId = parseInt(teacherId);
  const teacherNotFound = await prisma.teacher.findUnique({
    where:{
      id: parsedTeacherId
    }
  })

  if(!teacherNotFound){
    throw new ApiError(400, "Teacher not found..");
  }


  const teacher = await prisma.teacher.update({
    where: {
      id: parsedTeacherId,
    },
    data: {
      documents: {
        updateMany: {
          where: {
            teacherId: parsedTeacherId, 
          },
          data: {
            fileName:filename,   
            fileUrl: file.url,     
          },
        },
      },
    },
    include: {
      documents: true, 
    },
  })

  return res.send(new ApiResponse(200, {teacher}, "file uploaded"));
})

export { uploadFile }