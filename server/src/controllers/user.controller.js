import ApiError from "../config/ApiError.js";
import ApiResponse from "../config/ApiResponse.js";
import { verifyPassword } from "../config/hashPass.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../config/asyncHandler.js";
import poolPromise from "../config/dbConnect.js";

const executeQuery = async (query, params) => {
  const pool = await poolPromise;
  const request = pool.request();
  if (params) {
    params.forEach((param) => request.input(param.name, param.value));
  }
  return request.query(query);
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const pool = await poolPromise;
  const request = pool.request();

  const userQuery = `
    SELECT email, password, role FROM Users WHERE email = @Email;
  `;
  const userResult = await request.input("Email", email).query(userQuery);

  if (userResult.recordset.length === 0) {
    throw new ApiError(404, "User not found");
  }

  const user = userResult.recordset[0];

  const isPasswordCorrect = verifyPassword(user.password, password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    {
      user_id: user.user_id,
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

  return res.send(
    new ApiResponse(200, { user, token }, "User logged in successfully")
  );
});

const getAllUsers = asyncHandler(async (req, res) => {
  const pool = await poolPromise;
  const request = pool.request();

  const usersQuery = `
    SELECT user_id, email, fname, lname, role, phone, gender
    FROM Users;
  `;
  const usersResult = await request.query(usersQuery);

  return res.send(
    new ApiResponse(200, usersResult.recordset, "Users fetched successfully")
  );
});

const getUserById = asyncHandler(async (req, res) => {
  const user_id = req.params.userId;

  const parseduser_id = parseInt(user_id);
  if (isNaN(parseduser_id)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const pool = await poolPromise;
  const request = pool.request();

  const userQuery = `
    SELECT user_id, email, fname, mname, address, lname, role, phone, gender, dob
    FROM Users
    WHERE user_id = @user_id;
  `;
  const userResult = await request
    .input("user_id", parseduser_id)
    .query(userQuery);

  if (userResult.recordset.length === 0) {
    throw new ApiError(404, "User not found");
  }

  return res.send(
    new ApiResponse(200, userResult.recordset[0], "User found successfully")
  );
});

const logOutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  return res.send(new ApiResponse(200, "User logged out successfully"));
});

const getAllMentors = asyncHandler(async (req, res) => {
  const mentorQuery = `
    SELECT u.user_id, u.email, u.fname, u.lname, u.role, u.phone, u.gender, MA.std, MA.div, MA.mentor_id
      FROM Users u
      LEFT JOIN Mentor_Allocates MA ON u.user_id = MA.user_id
      WHERE u.role = 'Mentor';
  `;
  const mentorResult = await executeQuery(mentorQuery);
  return res.send(
    new ApiResponse(200, mentorResult.recordset, "Mentors fetched successfully")
  );
});

const getAllClassTeacher = asyncHandler(async (req, res) => {
  const classTeacherQuery = `
    select u.user_id, u.fname, u.lname, u.email, u.phone, u.role, u.gender, ct.std, ct.div
    from users u
    LEFT JOIN ClassTeacher_Allocates ct ON u.user_id = ct.user_id
    where u.role = 'ClassTeacher'`;
  const classTeacherResult = await executeQuery(classTeacherQuery);
  return res.send(
    new ApiResponse(
      200,
      classTeacherResult.recordset,
      "Class Teachers fetched successfully"
    )
  );
});

export {
  loginUser,
  getAllUsers,
  getUserById,
  logOutUser,
  getAllMentors,
  getAllClassTeacher,
};
