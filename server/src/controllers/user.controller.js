import ApiError from "../config/ApiError.js";
import ApiResponse from "../config/ApiResponse.js";
import { verifyPassword } from "../config/hashPass.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../config/asyncHandler.js";

import { PrismaClient } from "@prisma/client";
const prisma  = new PrismaClient();

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");  
  }

  const isPasswordCorrect = verifyPassword(user.password, password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SEC,
    { expiresIn: "24h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });


  return res.send(new ApiResponse(200, { user, token }, "User logged in successfully"))
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany();

  return res.send(new ApiResponse(200, users, "Users fetched successfully"));
});

const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
    select:{
      email: true,
      fname: true,
      lname: true,
      role: true,
      phone: true,
      gender: true,
    }
  });

  return res.send(new ApiResponse(200, user, "User found successfully"));
});

const logOutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  return res.send(new ApiResponse(200, "User logged out successfully"));
});

export { loginUser, getAllUsers, getUserById, logOutUser };
