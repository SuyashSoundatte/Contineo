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
  const { fname, mname, lname, address, gender, DOB, email, password, phone, role } = req.body;

  if (!fname || !mname || !lname || !address || !gender || !DOB || !email || !password || !phone || !role) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  // Check if email already exists in the User table
  const checkEmailQuery = "SELECT COUNT(*) AS count FROM Users WHERE email = @Email";
  const existingEmail = await executeQuery(checkEmailQuery, [{ name: 'Email', value: email }]);

  if (existingEmail.recordset[0].count > 0) {
    throw new ApiError(400, "Email already in use");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Insert into User table
  const insertUserQuery = `
    INSERT INTO users (user_id, fname, mname, lname, address, gender, DOB, email, password, phone_number, role)
    VALUES (NEWID(),@Fname, @Mname, @Lname, @Address, @Gender, @DOB, @Email, @Password, @Phone, @Role);
    SELECT SCOPE_IDENTITY() AS id;
  `;

  const userParams = [
    { name: 'Fname', value: fname },
    { name: 'Mname', value: mname },
    { name: 'Lname', value: lname },
    { name: 'Address', value: address },
    { name: 'Gender', value: gender },
    { name: 'DOB', value: DOB },
    { name: 'Email', value: email },
    { name: 'Password', value: hashedPassword },
    { name: 'Phone', value: phone },
    { name: 'Role', value: role },
  ];

  const userResult = await executeQuery(insertUserQuery, userParams);
  const userId = userResult.recordset[0].id;

  // If the role is Teacher, create an entry in the Teacher table and associate a document
  if (role === "Teacher") {
    const insertTeacherQuery = `
      INSERT INTO Teachers (userId)
      VALUES (@UserId);
      SELECT SCOPE_IDENTITY() AS teacherId;
    `;
    
    const teacherParams = [
      { name: 'UserId', value: userId }
    ];
    
    const teacherResult = await executeQuery(insertTeacherQuery, teacherParams);
    const teacherId = teacherResult.recordset[0].teacherId;

    const insertDocumentQuery = `
      INSERT INTO Documents (teacherId)
      VALUES (@TeacherId);
    `;

    const documentParams = [
      { name: 'TeacherId', value: teacherId }
    ];
    
    await executeQuery(insertDocumentQuery, documentParams);
  }

  // Return successful response
  return res.send(new ApiResponse(201, { id: userId, email }, "User created successfully"));
});

export { createUser };
