import asyncHandler from "../config/asyncHandler.js";
import poolPromise from "../config/dbConnect.js";
import ApiError from "../config/ApiError.js";
import ApiResponse from "../config/ApiResponse.js";
import { hashPassword } from "../config/hashPass.js";

// SQL Server query helper functions
const executeQuery = async (query, params) => {
  const pool = await poolPromise; // Await the pool connection
  const request = pool.request();
  if (params) {
    params.forEach((param) => request.input(param.name, param.value));
  }
  return request.query(query);
};

const createUser = asyncHandler(async (req, res) => {
  const { fname, mname, lname, address, gender, dob, email, password, phone, role } = req.body;

  // Validate required fields
  if (!fname || !lname || !email || !password || !phone || !role) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  // Check if email already exists
  const checkEmailQuery = "SELECT COUNT(*) AS count FROM Users WHERE email = @Email";
  const existingEmail = await executeQuery(checkEmailQuery, [{ name: "Email", value: email }]);

  if (existingEmail.recordset[0].count > 0) {
    throw new ApiError(400, "Email already in use");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Insert into Users table
  const insertUserQuery = `
    INSERT INTO Users (fname, mname, lname, address, gender, dob, email, password, phone, role)
    VALUES (@Fname, @Mname, @Lname, @Address, @Gender, @DOB, @Email, @Password, @Phone, @Role);
    SELECT SCOPE_IDENTITY() AS id;
  `;
  const userParams = [
    { name: "Fname", value: fname },
    { name: "Mname", value: mname || null },
    { name: "Lname", value: lname },
    { name: "Address", value: address || null },
    { name: "Gender", value: gender || null },
    { name: "DOB", value: dob },
    { name: "Email", value: email },
    { name: "Password", value: hashedPassword },
    { name: "Phone", value: phone },
    { name: "Role", value: role },
  ];
  const userResult = await executeQuery(insertUserQuery, userParams);
  const userId = userResult.recordset[0].id;

  // Return successful response
  return res.send(new ApiResponse(201, { id: userId, email }, "User created successfully"));
});

export { createUser };
