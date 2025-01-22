import asyncHandler from "../config/asyncHandler.js";
import ApiError from "../config/ApiError.js";
import poolPromise from "../config/dbConnect.js";
import ApiResponse from "../config/ApiResponse.js";
import { executeQuery } from '../config/executeQuery.js'

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
    class_std,
  } = req.body;

  // Validate required fields
  if (
    !fname ||
    !mname ||
    !lname ||
    !address ||
    !gender ||
    !dob ||
    !email ||
    !roll_no ||
    !phone ||
    !class_std
  ) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  // Check if email already exists
  const checkEmailQuery = "SELECT COUNT(*) AS count FROM Users WHERE email = @Email";
  const existingEmail = await executeQuery(checkEmailQuery, [
    { name: "Email", value: email },
  ]);

  if (existingEmail.recordset[0].count > 0) {
    throw new ApiError(400, "Email already in use");
  }

  // Check if roll_no already exists
  const checkRollNoQuery = "SELECT COUNT(*) AS count FROM Students WHERE roll_no = @RollNo";
  const existingRollNo = await executeQuery(checkRollNoQuery, [
    { name: "RollNo", value: roll_no },
  ]);

  if (existingRollNo.recordset[0].count > 0) {
    throw new ApiError(400, "Roll number already in use");
  }

  // Insert the user into the Users table 
  const insertUserQuery = `
    INSERT INTO Users (fname, mname, lname, address, gender, dob, email, phone, role, password)
    VALUES (@Fname, @Mname, @Lname, @Address, @Gender, @Dob, @Email, @Phone, 'Student', @Dob);
    SELECT SCOPE_IDENTITY() AS id;
  `;
  const userParams = [
    { name: "Fname", value: fname },
    { name: "Mname", value: mname },
    { name: "Lname", value: lname },
    { name: "Address", value: address },
    { name: "Gender", value: gender },
    { name: "Dob", value: dob },
    { name: "Email", value: email },
    { name: "Phone", value: phone },
  ];

  const userResult = await executeQuery(insertUserQuery, userParams);
  const userId = userResult.recordset[0].id;

  // Insert or update the Students table
  const insertStudentQuery = `
    INSERT INTO Students (user_id, roll_no, std)
    VALUES (@UserId, @RollNo, @ClassStd);
  `;
  console.log(userId);
  const studentParams = [
    { name: "UserId", value: userId },
    { name: "RollNo", value: roll_no },
    { name: "ClassStd", value: class_std },
  ];

  await executeQuery(insertStudentQuery, studentParams);

  return res.send(
    new ApiResponse(201, { id: userId, email }, "Student created successfully")
  );
});


const allocateStudentDiv = asyncHandler(async (req, res) => {
  const { userId, stuId, divId } = req.body;

  if (!stuId || !divId) {
    throw new ApiError(400, "Please provide both student ID and division ID");
  }

  const insertStudentDivQuery = `
    INSERT INTO StudentDivision (stu_id, div_id)
    VALUES (@StuId, @DivId)
    WHERE user_id = @UserId;;
  `;

  const studentDivParams = [
    { name: "DivId", value: divId },
    { name: "StuId", value: stuId },
  ];

  await executeQuery(insertStudentDivQuery, studentDivParams);

  return res.send(
    new ApiResponse(
      201,
      { id: stuId, divId },
      "Student Division allocation created successfully"
    )
  );
});

const updateStudent = asyncHandler(async (req, res) => {
  const { userId, divId } = req.body;

  const updateStudentQuery = `
    UPDATE student 
    SET div = @DivId
    WHERE user_id = @UserId;
  `;
  const updateStudentParams = [
    { name: "DivId", value: divId },
    { name: "UserId", value: userId },
    { name: "StdId", value: stdId },
  ];
  await executeQuery(updateStudentQuery, updateStudentParams);
  return res.send(
    new ApiResponse(
      200,
      { userId, stdId, divId },
      "Student updated successfully"
    )
  );
});

//Get All Students
const getAllStudent = asyncHandler(async (req, res) => {
  const pool = await poolPromise;
  const request = pool.request();

  const usersQuery = `
    SELECT s.user_id, u.email, u.fname, u.lname, u.role, u.phone AS phone, u.gender, s.roll_no, s.std, s.div, s.stu_id
    FROM Users u
    INNER JOIN Students s ON u.user_id = s.user_id
    WHERE u.role = 'Student';
  `;

  const usersResult = await request.query(usersQuery);

  return res.send(
    new ApiResponse(200, usersResult.recordset, "Users fetched successfully")
  );
});

//get student by std
const getStudentByStd = asyncHandler(async (req, res) => {
  const pool = await poolPromise;
  const request = pool.request();

  const class_std = req.params.id;
  const parsedStd = String(class_std);

  const usersQuery = `
    SELECT u.email, u.fname, u.lname, u.role, u.phone AS phone, u.gender, s.roll_no, s.std
    FROM Users u
    INNER JOIN Students s ON u.user_id = s.user_id
    WHERE u.role = 'Student' AND s.std = @ClassStd;
  `;

  const usersResult = await request
    .input("ClassStd", parsedStd)
    .query(usersQuery);

  return res.send(
    new ApiResponse(200, usersResult.recordset, "Students fetched successfully")
  );
});

const getAllocatedStudent = asyncHandler(async (req, res) => {
  const pool = await poolPromise;
  const request = pool.request();

  const getAllocatedStudentQuery = `
    select u.fname, u.lname, u.gender, s.roll_no, s.std
    from users u
    join Students s on u.user_id = s.user_id
    where s.div is null 
  `;

  const allocatedStudentResult = await request.query(getAllocatedStudentQuery);
  return res.send(
    new ApiResponse(
      200,
      allocatedStudentResult.recordset,
      "Allocated Students fetched successfully"
    )
  );
});

const getStudentById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const studentByIdQuery = `
    SELECT s.stu_id, u.email, u.fname, u.lname, u.role, u.phone AS phone, u.gender, s.roll_no, s.std, s.div
    FROM Users u
    INNER JOIN Students s ON u.user_id = s.user_id
    WHERE u.role = 'Student' AND s.stu_id = @StudentId;
  `;

  const studentByIdResult = await executeQuery(studentByIdQuery, [
    { name: "StudentId", value: id },
  ]);

  return res.send(
    new ApiResponse(
      200,
      studentByIdResult.recordset,
      "Student fetched successfully"
    )
  );
});

const getStudentByDiv = asyncHandler(async (req, res) => {
  const div = req.params.div;

  const studentByDivQuery = `
    SELECT s.stu_id, u.fname, u.lname, u.email, u.phone, s.roll_no, s.std
    FROM Users u
    INNER JOIN Students s ON u.user_id = s.user_id
    WHERE u.role = 'Student' AND s.div = @div;
  `;

  const studentByDivResult = await executeQuery(studentByDivQuery, [
    { name: "div", value: div },
  ]);

  return res.send(
    new ApiResponse(
      200,
      studentByDivResult.recordset,
      "Student fetched successfully"
    )
  );
});

const assignStudentsToDivision = asyncHandler(async (req, res) => {
  const { studentIds, div } = req.body;

  if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0 || !div) {
    throw new ApiError(400, 'Invalid input. Provide studentIds as an array and a division.');
  }

  if (!studentIds.every(id => Number.isInteger(id))) {
    throw new ApiError(400, 'Invalid student IDs provided. Ensure all IDs are integers.');
  }

    const studentIdPlaceholders = studentIds.map((_, index) => `@stu_id${index}`).join(',');

    const query = `
      UPDATE Students
      SET div = @div
      WHERE stu_id IN (${studentIdPlaceholders})
    `;

    const params = [
      { name: 'div', value: div },
      ...studentIds.map((id, index) => ({ name: `stu_id${index}`, value: id })),
    ];

    const result = await executeQuery(query, params);

    res.status(200).send({
      message: 'Students assigned to the division successfully.',
      affectedRows: result.rowsAffected[0],
    });
});

const getStudentByStdDiv = asyncHandler(async(req, res)=>{
  const std = req.params.std;
  const div = req.params.div;

  const getStudentByStdDivQuery = `
    select s.stu_id, u.fname, u.lname, u.gender, s.div, s.std, s.roll_no
    from Users u
    join Students s on u.user_id = s.user_id
    where s.div = @Div and s.std = @Std 
  `

  const divStdParams = [
    { name:"Std", value:std },
    { name:"Div", value:div }
  ]

  const divStdResult = await executeQuery(getStudentByStdDivQuery, divStdParams);

  return res.send(new ApiResponse(200, divStdResult.recordset, "student get by std and div"));
})

export {
  createStudent,
  allocateStudentDiv,
  updateStudent,
  getAllStudent,
  getStudentByStd,
  getAllocatedStudent,
  getStudentById,
  getStudentByDiv,
  assignStudentsToDivision,
  getStudentByStdDiv
};
