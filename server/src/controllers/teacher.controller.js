import asyncHandler from "../config/asyncHandler.js";
import ApiError from "../config/ApiError.js";
import ApiResponse from "../config/ApiResponse.js";
import poolPromise from "../config/dbConnect.js";

const executeQuery = async (query, params) => {
  const pool = await poolPromise;
  const request = pool.request();
  if (params) {
    params.forEach((param) => request.input(param.name, param.value));
  }
  return request.query(query);
};

const allocateTeacherSubject = asyncHandler(async (req, res) => {
  const { teacherId, subject, std, div } = req.body;

  console.log("Request Body:", req.body);

  if (!teacherId || !subject || !std || !div) {
    console.log("Validation Error: Missing required fields");
    throw new ApiError("Missing required fields", 400);
  }

  const insertTeacherSubjectQuery = `
    INSERT INTO Teacher_Allocates (teacher_id, subjects, std, div)
    VALUES (@TeacherId, @Subject, @Std, @Div);
  `;

  const teacherSubjectParams = [
    { name: "TeacherId", value: teacherId },
    { name: "Subject", value: subject },
    { name: "Std", value: std },
    { name: "Div", value: div },
  ];

  try {
    console.log("Executing SQL Query...");
    await executeQuery(insertTeacherSubjectQuery, teacherSubjectParams);
    console.log("Query Executed Successfully");

    return res.send(
      new ApiResponse(
        201,
        { subject, std, div },
        "Teacher Subject allocated successfully"
      )
    );
  } catch (err) {
    console.error("Error executing query:", err.message);
    throw new ApiError("Failed to allocate teacher subject", 500);
  }
});

const updateTeacherSubject = asyncHandler(async (req, res) => {
  const { teacherId, subject, std, div } = req.body;

  if (!teacherId || !subject || !std || !div) {
    throw new ApiError("Missing required fields", 400);
  }

  const updateTeacherSubjectQuery =
    "UPDATE Teacher_Allocates SET std = @Std, subjects = @Subject, div = @Div WHERE teacher_id = @TeacherId";
  const updateTeacherSubjectParams = [
    { name: "TeacherId", value: teacherId },
    { name: "Div", value: div },
    { name: "Subject", value: subject },
    { name: "Std", value: std },
  ];
  await executeQuery(updateTeacherSubjectQuery, updateTeacherSubjectParams);
  return res.send(
    new ApiResponse(
      200,
      { teacherId, subject, std, div },
      "Teacher Subject updated successfully"
    )
  );
});

const getAllTeacher = asyncHandler(async (req, res) => {
  const usersQuery = `
    SELECT t.teacher_id, 
       u.email, 
       u.fname, 
       u.lname, 
       u.role, 
       u.phone, 
       u.gender, 
       t.subjects, 
       ta.std, 
       ta.div
FROM Users u
JOIN Teachers t ON u.user_id = t.user_id
LEFT JOIN Teacher_Allocates ta ON t.teacher_id = ta.teacher_id
WHERE u.role = 'Teacher';
  `;

  const usersResult = await executeQuery(usersQuery);

  return res.send(
    new ApiResponse(200, usersResult.recordset, "Users fetched successfully")
  );
});

const getTeacherById = asyncHandler(async (req, res) => {
  const teacherId = req.params.id;
  const parsedId = String(teacherId);

  const usersQuery = `
  SELECT t.teacher_id, u.email, u.fname, u.lname, u.role, u.phone, u.gender
  FROM Users u
  join Teachers t on u.user_id = t.user_id
  WHERE u.role = 'Teacher' AND t.teacher_id = @TeacherId;
  `;

  const usersResult = await executeQuery(usersQuery, [
    { name: "TeacherId", value: parsedId },
  ]);

  return res.send(
    new ApiResponse(200, usersResult.recordset, "Teacher fetched successfully")
  );
});

const getTeacherByStd = asyncHandler(async (req, res) => {
  const std = req.params.std;

  const teacherByDivQuery = `
    SELECT t.teacher_id, u.fname, u.lname, u.email, u.phone 
    FROM Users u
    JOIN Teachers t ON u.user_id = t.user_id
    WHERE u.role = 'Teacher' AND t.std = @Std;
  `;

  const teacherByDivResult = await executeQuery(teacherByDivQuery, [
    { name: "Std", value: std },
  ]);

  return res.send(
    new ApiResponse(
      200,
      teacherByDivResult.recordset,
      "Teacher fetched successfully"
    )
  );
});

const getTeacherBySubject = asyncHandler(async (req, res) => {
  const subject = req.params.sub;

  const teacherBySubjectQuery = `
    SELECT u.user_id, u.fname, u.lname, u.email, u.phone 
    FROM Users u
    JOIN Teachers t ON u.user_id = t.user_id
    WHERE u.role = 'Teacher' AND t.subjects = @Subject;
  `;

  const teacherBySubjectResult = await executeQuery(teacherBySubjectQuery, [
    { name: "Subject", value: subject },
  ]);

  return res.send(
    new ApiResponse(
      200,
      teacherBySubjectResult.recordset,
      "Teacher fetched successfully"
    )
  );
});

// const createTeacher = asyncHandler(async (req, res) => {
//   const {
//     fname,
//     mname,
//     lname,
//     address,
//     gender,
//     dob,
//     email,
//     password,
//     phone,
//     role,
//     subjects,
//   } = req.body;

//   if (
//     !fname ||
//     !lname ||
//     !address ||
//     !gender ||
//     !dob ||
//     !email ||
//     !password ||
//     !phone ||
//     !role ||
//     !subjects
//   ) {
//     throw new ApiError(400, "All fields are required.");
//   }

//   if (!Array.isArray(subjects) || subjects.length === 0) {
//     throw new ApiError(400, "Subjects must be a non-empty array.");
//   }

//   // Step 1: Insert teacher into Teachers table
//   const teacherInsertQuery = `
//       INSERT INTO Teachers (FirstName, MiddleName, LastName, Address, Gender, DOB, Email, Password, Phone, Role)
//       OUTPUT INSERTED.TeacherID
//       VALUES (@fname, @mname, @lname, @address, @gender, @dob, @password, @phone, @role)
//     `;

//   const teacherParams = [
//     { name: "fname", value: fname },
//     { name: "mname", value: mname },
//     { name: "lname", value: lname },
//     { name: "address", value: address },
//     { name: "gender", value: gender },
//     { name: "dob", value: dob },
//     { name: "email", value: email },
//     { name: "password", value: password },
//     { name: "phone", value: phone },
//     { name: "role", value: role },
//   ];

//   const teacherResult = await executeQuery(teacherInsertQuery, teacherParams);
//   const teacherID = teacherResult.recordset[0].TeacherID;

//   // Step 2: Insert subjects into TeacherSubjects table
//   const subjectInsertQuery = `
//       INSERT INTO Teachers (TeacherID, Subject)
//       VALUES (@teacherID, @subject)
//     `;

//   for (const subject of subjects) {
//     const subjectParams = [
//       { name: "teacherID", value: teacherID },
//       { name: "subject", value: subject },
//     ];
//     await executeQuery(subjectInsertQuery, subjectParams);
//   }

//   // Step 3: Send response
//   res.send(
//     new ApiResponse(
//       201,
//       teacherResult.recordset,

//       "Teacher and subjects created successfully."
//     )
//   );
// });

const assignMentorByStdDiv = asyncHandler(async (req, res, next) => {
  const { userId, std, div } = req.body;

  if (!userId || !std || !div) {
    return next(new ApiError(400, "Invalid request data"));
  }

  try {
    // Check if a mentor is already assigned for the given standard and division
    const existingAssignment = await executeQuery(
      "SELECT mentor_id FROM Mentor_Allocates WHERE std = @std AND div = @div",
      [
        { name: "std", value: std },
        { name: "div", value: div },
      ]
    );

    if (existingAssignment.recordset.length > 0) {
      throw new ApiError(
        401,
        "A mentor is already assigned to this standard and division"
      );
    }

    // Check if the user is a mentor
    const userRoleCheck = await executeQuery(
      "SELECT role FROM Users WHERE user_id = @user_id",
      [{ name: "user_id", value: userId }]
    );

    if (
      userRoleCheck.recordset.length === 0 ||
      userRoleCheck.recordset[0].role !== "Mentor"
    ) {
      throw new ApiError(403, "The user is not a mentor");
    }

    // Assign the mentor to the standard and division
    const mt_allocates = await executeQuery(
      "INSERT INTO Mentor_Allocates (user_id, std, div) VALUES (@user_id, @std, @div)",
      [
        { name: "user_id", value: userId },
        { name: "std", value: std },
        { name: "div", value: div },
      ]
    );

    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          mt_allocates.recordset,
          "Mentor assigned successfully"
        )
      );
  } catch (error) {
    next(
      new ApiError(
        500,
        "An error occurred while assigning the mentor",
        [],
        error.stack
      )
    );
  }
});

const assignClassTeacherByStdDiv = asyncHandler(async (req, res, next) => {
  const { userId, std, div } = req.body;

  if (!userId || !std || !div) {
    return next(new ApiError(400, "Invalid request data"));
  }

  try {
    // Check if a class teacher is already assigned for the given standard and division
    const existingAssignment = await executeQuery(
      "SELECT ct_id FROM ClassTeacher_Allocates WHERE std = @std AND div = @div",
      [
        { name: "std", value: std },
        { name: "div", value: div },
      ]
    );

    if (existingAssignment.recordset.length > 0) {
      throw new ApiError(
        401,
        "A class teacher is already assigned to this standard and division"
      );
    }

    // Check if the user is a class teacher
    const userRoleCheck = await executeQuery(
      "SELECT role FROM Users WHERE user_id = @user_id",
      [{ name: "user_id", value: userId }]
    );

    if (
      userRoleCheck.recordset.length === 0 ||
      userRoleCheck.recordset[0].role !== "ClassTeacher"
    ) {
      throw new ApiError(403, "The user is not a class teacher");
    }

    // Assign the class teacher to the standard and division
    const ct_allocates = await executeQuery(
      "INSERT INTO ClassTeacher_Allocates (user_id, std, div) VALUES (@user_id, @std, @div)",
      [
        { name: "user_id", value: userId },
        { name: "std", value: std },
        { name: "div", value: div },
      ]
    );

    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          ct_allocates.recordset,
          "Class teacher assigned successfully"
        )
      );
  } catch (error) {
    next(
      new ApiError(
        500,
        "An error occurred while assigning the class teacher",
        [],
        error.stack
      )
    );
  }
});

export {
  allocateTeacherSubject,
  updateTeacherSubject,
  getAllTeacher,
  getTeacherById,
  getTeacherByStd,
  getTeacherBySubject,
  assignClassTeacherByStdDiv,
  assignMentorByStdDiv,
};
