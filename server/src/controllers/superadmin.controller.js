import asyncHandler from "../config/asyncHandler.js";
import ApiError from "../config/ApiError.js";
import ApiResponse from "../config/ApiResponse.js";
import { hashPassword } from "../config/hashPass.js";
import { executeQuery } from "../config/executeQuery.js";

const createUser = asyncHandler(async (req, res) => {
  const { 
    fname, 
    mname, 
    lname, 
    address, 
    gender, 
    dob, 
    email, 
    password, 
    phone, 
    role,
    subjects
  } = req.body;

  if (!fname || !lname || !email || !password || !phone || !role) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  if (!['SuperAdmin', 'Teacher', 'OfficeStaff', 'Mentor', 'ClassTeacher', 'ClassTeacherIncharge', 'MentorIncharge'].includes(role)) {
    throw new ApiError(400, "Invalid role specified");
  }

  if (role === "Teacher" && (!subjects || subjects.length === 0)) {
    throw new ApiError(400, "At least one subject is required for Teacher role");
  }

  const checkEmailQuery = "SELECT COUNT(*) AS count FROM Users WHERE email = @Email";
  const existingEmail = await executeQuery(checkEmailQuery, [
    { name: "Email", value: email }
  ]);

  if (existingEmail.recordset[0].count > 0) {
    throw new ApiError(400, "Email already in use");
  }

  const hashedPassword = await hashPassword(password);

  const insertUserQuery = `
    INSERT INTO Users (fname, mname, lname, address, gender, dob, email, password, phone, role)
    OUTPUT INSERTED.user_id
    VALUES (@Fname, @Mname, @Lname, @Address, @Gender, @Dob, @Email, @Password, @Phone, @Role);
  `;

  const userParams = [
    { name: "Fname", value: fname },
    { name: "Mname", value: mname || null },
    { name: "Lname", value: lname },
    { name: "Address", value: address || null },
    { name: "Gender", value: gender || null },
    { name: "Dob", value: dob },
    { name: "Email", value: email },
    { name: "Password", value: hashedPassword },
    { name: "Phone", value: phone },
    { name: "Role", value: role }
  ];

  const userResult = await executeQuery(insertUserQuery, userParams);
  const userId = userResult.recordset[0].user_id;

  if (role === "Teacher") {
    const teacherQuery = `
      INSERT INTO Teachers (user_id, subjects)
      VALUES (@UserId, @Subjects);
    `;
  
    const teacherParams = [
      { name: 'UserId', value: userId },
      { name: 'Subjects', value: JSON.stringify(subjects) }
    ];

    console.log('Teacher Query:', teacherQuery);
    console.log('Teacher Params:', teacherParams);

    await executeQuery(teacherQuery, teacherParams);
  }

  return res.send(new ApiResponse(201, { id: userId, email }, "User created successfully"));
});

export { createUser };
