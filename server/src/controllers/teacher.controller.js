import asyncHandler from "../config/asyncHandler.js";
import { PrismaClient } from "@prisma/client";
import ApiError from "../config/ApiError.js";
import ApiResponse from "../config/ApiResponse.js";
const prisma = new PrismaClient();

const getTeachers = asyncHandler(async(req, res)=>{
  const teachers = await prisma.user.findMany({
    where:{
      role: "Teacher"
    },
    select:{
      email: true,
      fname: true,
      lname: true,
      role: true,
      phone: true,
      gender: true,
    },
    orderBy:{
      id: "asc"
    }
  })

  return res.send(new ApiResponse(201, teachers, "Teachers found successfully"));
})

const getTeacherById = asyncHandler(async(req, res)=>{
  const { teacherId } = req.params;
  
  const parseTeacherID = parseInt(teacherId)

  const teacher = await prisma.teacher.findUnique({
    where:{
      id: parseTeacherID
    },
    include:{
      documents:true
    }
  })

  return res.send(new ApiResponse(200, teacher, "Teacher found successfully"));
})

export { getTeachers, getTeacherById };