import ApiError from "../config/ApiError.js";
import ApiResponse from "../config/ApiResponse.js";
import { verifyPassword } from "../config/hashPass.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../config/asyncHandler.js";
import poolPromise from "../config/dbConnect.js";

// User login handler
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const pool = await poolPromise;
  const request = pool.request();

  // SQL query to fetch user by email
  const userQuery = `
    SELECT email, password, role FROM Users WHERE email = @Email;
  `;
  const userResult = await request.input('Email', email).query(userQuery);

  if (userResult.recordset.length === 0) {
    throw new ApiError(404, "User not found");
  }

  const user = userResult.recordset[0];

  // Verify the password
  const isPasswordCorrect = verifyPassword(user.password, password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate JWT token
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

  return res.send(new ApiResponse(200, { user, token }, "User logged in successfully"));
});

// Get all users handler
const getAllUsers = asyncHandler(async (req, res) => {
  const pool = await poolPromise;
  const request = pool.request();

  // SQL query to fetch all users
  const usersQuery = `
    SELECT email, fname, lname, role, phone, gender
    FROM Users;
  `;
  const usersResult = await request.query(usersQuery);

  return res.send(new ApiResponse(200, usersResult.recordset, "Users fetched successfully"));
});

// Get user by ID handler
const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const parsedUserId = parseInt(userId);
  if (isNaN(parsedUserId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const pool = await poolPromise;
  const request = pool.request();

  // SQL query to fetch user by ID
  const userQuery = `
    SELECT email, fname, lname, role, phone, gender
    FROM Users
    WHERE id = @UserId;
  `;
  const userResult = await request.input('UserId', parsedUserId).query(userQuery);

  if (userResult.recordset.length === 0) {
    throw new ApiError(404, "User not found");
  }

  return res.send(new ApiResponse(200, userResult.recordset[0], "User found successfully"));
});

// User logout handler
const logOutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  return res.send(new ApiResponse(200, "User logged out successfully"));
});

export { loginUser, getAllUsers, getUserById, logOutUser };
