import asyncHandler from "../config/asyncHandler.js";
import poolPromise from "../config/dbConnect.js";
import ApiError from "../config/ApiError.js";
import ApiResponse from "../config/ApiResponse.js";

// SQL Server query helper functions
const executeQuery = async (query, params) => {
  const pool = await poolPromise; // Await the pool connection
  const request = pool.request();
  if (params) {
    params.forEach((param) => request.input(param.name, param.value));
  }
  return request.query(query);
};

const createStudent = asyncHandler(async (req, res) => {
  const {
    fname,
    mname,
    lname,
    address,
    gender,
    dob,
    email,
    roll_no,
    phone_number,
  } = req.body;

  if (!fname || !mname || !lname || !address || !gender || !dob || !email || !roll_no || !phone_number) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  // Check if email already exists in the User table
  const checkEmailQuery = "SELECT COUNT(*) AS count FROM Users WHERE email = @Email";
  const existingEmail = await executeQuery(checkEmailQuery, [{ name: 'Email', value: email }]);

  if (existingEmail.recordset[0].count > 0) {
    throw new ApiError(400, "Email already in use");
  }

  // Insert into Users table
  const insertUserQuery = `
    INSERT INTO Users (fname, mname, lname, address, gender, dob, email, phone_number, role)
    VALUES (@Fname, @Mname, @Lname, @Address, @Gender, @dob, @Email, @phone_number, 'Student');
    SELECT SCOPE_IDENTITY() AS id;
  `;

  const userParams = [
    { name: 'Fname', value: fname },
    { name: 'Mname', value: mname },
    { name: 'Lname', value: lname },
    { name: 'Address', value: address },
    { name: 'Gender', value: gender },
    { name: 'dob', value: dob },
    { name: 'Email', value: email },
    { name: 'phone_number', value: phone_number },
  ];

  const userResult = await executeQuery(insertUserQuery, userParams);
  const userId = userResult.recordset[0].id;

  // Insert into Student table
  const insertStudentQuery = `
    INSERT INTO student (user_id, roll_no)
    VALUES (@UserId, @RollNo);
  `;

  const studentParams = [
    { name: 'UserId', value: userId },
    { name: 'RollNo', value: roll_no },
  ];

  await executeQuery(insertStudentQuery, studentParams);

  // Return successful response
  return res.send(new ApiResponse(201, { id: userId, email }, "Student created successfully"));
});

export { createStudent };
