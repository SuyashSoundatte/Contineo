import asyncHandler from "../config/asyncHandler.js";
import { PrismaClient } from "@prisma/client";
import ApiError from "../config/ApiError.js";
import ApiResponse from "../config/ApiResponse.js";
import { hashPassword } from "../config/hashPass.js";
const prisma = new PrismaClient();

const createUser = asyncHandler(async (req, res) => {
  const { fname, mname, lname, address, gender, DOB, email, password, phone, role } = req.body;

  if (!fname || !mname || !lname || !address || !gender || !DOB || !email || !password || !phone || !role) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(400, "Email already in use");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      fname,
      mname,
      lname,
      address,
      gender,
      DOB,
      email,
      password: hashedPassword,
      phone,
      role,
    },
  });

  if (user.role === "Teacher") {
    const teacher = await prisma.teacher.create({
      data: {
        userId: user.id,
      },
    });

    await prisma.document.create({
      data: {
        teacherId: teacher.id,
      },
    });
  }

  return res.send(new ApiResponse(201, user, "User created successfully"));
});


export { createUser };