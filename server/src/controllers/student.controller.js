import asyncHandler from "../config/asyncHandler.js";
import poolPromise from "../config/dbConnect.js";
import ApiError from "../config/ApiError.js";
import ApiResponse from "../config/ApiResponse.js";

const executeQuery = async (query, params) => {
  const pool = await poolPromise;
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
    phone,
  } = req.body;

  if (!fname || !mname || !lname || !address || !gender || !dob || !email || !roll_no || !phone) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const checkEmailQuery = "SELECT COUNT(*) AS count FROM Users WHERE email = @Email";
  const existingEmail = await executeQuery(checkEmailQuery, [{ name: 'Email', value: email }]);

  if (existingEmail.recordset[0].count > 0) {
    throw new ApiError(400, "Email already in use");
  }

  const insertUserQuery = `
    INSERT INTO Users (fname, mname, lname, address, gender, dob, email, phone, role, password)
    VALUES (@Fname, @Mname, @Lname, @Address, @Gender, @dob, @Email, @phone, 'Student', @dob);
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
    { name: 'phone', value: phone },
  ];

  const userResult = await executeQuery(insertUserQuery, userParams);
  const userId = userResult.recordset[0].id;

  const insertStudentQuery = `
    INSERT INTO student (user_id, roll_no)
    VALUES (@UserId, @RollNo);
  `;

  const studentParams = [
    { name: 'UserId', value: userId },
    { name: 'RollNo', value: roll_no },
  ];

  await executeQuery(insertStudentQuery, studentParams);

  return res.send(new ApiResponse(201, { id: userId, email }, "Student created successfully"));
});

const allocateStudentDiv = asyncHandler(async (req, res) => {
  const { userId, stdId, divId } = req.body;

  const insertStudentDivQuery = "INSERT INTO student (user_id, class_std, div) VALUES (@UserId, @StdId, @DivId)";
  const studentDivParams = [
    { name: 'UserId', value: userId },
    { name: 'StdId', value: stdId },
    { name: 'DivId', value: divId },
  ];

  await executeQuery(insertStudentDivQuery, studentDivParams);

  return res.send(new ApiResponse(201, { id: userId, stdId, divId }, "Student Div allocated successfully"));
});

const updateStudent = asyncHandler(async (req, res) => {
  const { userId, stdId, divId } = req.body;

  const updateStudentQuery = `
    UPDATE student 
    SET div = @DivId, class_std = @StdId 
    WHERE user_id = @UserId;
  `;
  const updateStudentParams = [
    { name: 'DivId', value: divId },
    { name: 'UserId', value: userId },
    { name: 'StdId', value: stdId },
  ];
  await executeQuery(updateStudentQuery, updateStudentParams);
  return res.send(new ApiResponse(200, { userId, stdId, divId }, "Student updated successfully"));
});

//Get All Students
const getAllStudent = asyncHandler(async (req, res) => {
  const pool = await poolPromise;
  const request = pool.request();

  const usersQuery = `
    SELECT u.email, u.fname, u.lname, u.role, u.phone AS phone, u.gender, s.roll_no, s.class_std, s.div
    FROM Users u
    INNER JOIN student s ON u.user_id = s.user_id
    WHERE u.role = 'Student';
  `;
  
  const usersResult = await request.query(usersQuery);

  return res.send(new ApiResponse(200, usersResult.recordset, "Users fetched successfully"));
});

//get student by std
const getStudentByStd = asyncHandler(async (req, res) => {
  const pool = await poolPromise;
  const request = pool.request();

const class_std  = req.params.id;
const parsedStd = String(class_std); 


  const usersQuery = `
    SELECT u.email, u.fname, u.lname, u.role, u.phone AS phone, u.gender, s.roll_no, s.class_std
    FROM Users u
    INNER JOIN student s ON u.user_id = s.user_id
    WHERE u.role = 'Student' AND s.class_std = @ClassStd;
  `;

  const usersResult = await request.input('ClassStd', parsedStd).query(usersQuery);

  return res.send(new ApiResponse(200, usersResult.recordset, "Students fetched successfully"));
});


const getAllocatedStudent = asyncHandler(async (req, res) => {
  const pool = await poolPromise;
  const request = pool.request();

  const getAllocatedStudentQuery = `
    select u.fname, u.lname, u.gender, s.roll_no, s.class_std
    from users u
    join student s on u.user_id = s.user_id
    where s.div is null 
  `;
 
  const allocatedStudentResult = await request.query(getAllocatedStudentQuery);
  return res.send(new ApiResponse(200, allocatedStudentResult.recordset, "Allocated Students fetched successfully"));
});

const getStudentById = asyncHandler(async (req, res) => {
  const id  = req.params.id;
  const studentByIdQuery = `
    SELECT u.email, u.fname, u.lname, u.role, u.phone AS phone, u.gender, s.roll_no, s.class_std
    FROM Users u
    INNER JOIN student s ON u.user_id = s.user_id
    WHERE u.role = 'Student' AND u.user_id = @UserId;
  `

  const studentByIdResult = await executeQuery(studentByIdQuery, [{ name: 'UserId', value: id }]);

  return res.send(new ApiResponse(200, studentByIdResult.recordset, "Student fetched successfully"));
});

const getStudentByDiv = asyncHandler(async (req, res) => {
  const div = req.params.div;

  const studentByDivQuery = `
    SELECT u.user_id, u.fname, u.lname, u.email, u.phone 
    FROM Users u
    INNER JOIN student s ON u.user_id = s.user_id
    WHERE u.role = 'Student' AND s.div = @div;
  `;

  const studentByDivResult = await executeQuery(studentByDivQuery, [{ name: 'div', value: div }]);

  return res.send(new ApiResponse(200, studentByDivResult.recordset, "Student fetched successfully"));
})

export { createStudent, allocateStudentDiv, updateStudent, getAllStudent, getStudentByStd, getAllocatedStudent, getStudentById, getStudentByDiv };