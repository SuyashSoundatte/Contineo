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

const allocateTeacherSubject = asyncHandler(async(req, res)=>{
  const { userId, subject, std, div } = req.body;

  if(!subject || !std || !div){
    throw new ApiError("Missing required fields", 400);
  }

  const checkSubjectQuery = "SELECT COUNT(*) AS count FROM subjects WHERE subject = @Subject";
  const existingSubject = await executeQuery(checkSubjectQuery, [{ name: 'Subject', value: subject }]);

  if(existingSubject.recordset[0].count > 0){
    throw new ApiError("Subject already in use", 400);
  }

  const checkStdQuery = "SELECT COUNT(*) AS count FROM student WHERE class_std = @Std";
  const existingStd = await executeQuery(checkStdQuery, [{ name: 'Std', value: std }]);

  if(existingStd.recordset[0].count > 0){
    throw new ApiError("Std already in use", 400);
  }

  const checkDivQuery = "SELECT COUNT(*) AS count FROM div WHERE div = @Div";
  const existingDiv = await executeQuery(checkDivQuery, [{ name: 'Div', value: div }]);

  if(existingDiv.recordset[0].count > 0){
    throw new ApiError("Div already in use", 400);
  }

  const insertTeacherSubjectQuery = `
    INSERT INTO teacher_subject (subject, class_std, div)
    VALUES (@Subject, @Std, @Div);
  `;

  const teacherSubjectParams = [
    { name: 'Subject', value: subject },
    { name: 'Std', value: std },
    { name: 'Div', value: div },
  ];

  await executeQuery(insertTeacherSubjectQuery, teacherSubjectParams);

  return res.send(new ApiResponse(201, { subject, std, div }, "Teacher Subject allocated successfully"));
})

const updateTeacherSubject = asyncHandler(async(req, res)=>{
  const { userId, subject, std, div } = req.body;

  if(!userId || !subject || !std || !div){
    throw new ApiError("Missing required fields", 400);
  }

  const updateTeacherSubjectQuery = "UPDATE teacher_assigned SET standard_name = @Std, subject_name = @Subject, div = @Div WHERE user_id = @UserId";  
  const updateTeacherSubjectParams = [
    { name: 'UserId', value: userId },
    { name: 'Div', value: div },
    { name: 'Subject', value: subject },
    { name: 'Std', value: std },
  ];
  await executeQuery(updateTeacherSubjectQuery, updateTeacherSubjectParams);
  return res.send(new ApiResponse(200, {userId, subject, std, div }, "Teacher Subject updated successfully"));
})

const getAllTeacher = asyncHandler(async (req, res) => {

  const usersQuery = `
    SELECT u.user_id, u.email, u.fname, u.lname, u.role, u.phone, u.gender
    FROM Users u
    WHERE u.role = 'Teacher';
  `;
  
  const usersResult = await executeQuery(usersQuery);

  return res.send(new ApiResponse(200, usersResult.recordset, "Users fetched successfully"));
});

const getTeacherById = asyncHandler(async (req, res) => {
  const userId  = req.params.id;
  const parsedId = String(userId); 

  const usersQuery = `
  SELECT user_id, email, fname, lname, role, phone, gender
  FROM Users
  WHERE role = 'Teacher' AND user_id = @UserId;
  `;

  const usersResult = await executeQuery(usersQuery, [{ name: 'UserId', value: parsedId }]);

  return res.send(new ApiResponse(200, usersResult.recordset, "Teacher fetched successfully"));
});

const getTeacherByStd = asyncHandler(async(req, res)=>{
  const std = req.params.std; 

  const teacherByDivQuery = `
    SELECT u.user_id, u.fname, u.lname, u.email, u.phone 
    FROM Users u
    JOIN teacher t ON u.user_id = t.user_id
    WHERE u.role = 'Teacher' AND t.std = @Std;
  `;

  const teacherByDivResult = await executeQuery(teacherByDivQuery, [{ name: 'Std', value: std }]);

  return res.send(new ApiResponse(200, teacherByDivResult.recordset, "Teacher fetched successfully"));
})

const getTeacherBySubject = asyncHandler(async(req, res)=>{
  const subject = req.params.sub; 

  const teacherBySubjectQuery = `
    SELECT u.user_id, u.fname, u.lname, u.email, u.phone 
    FROM Users u
    JOIN teacher t ON u.user_id = t.user_id
    WHERE u.role = 'Teacher' AND t.subject = @Subject;
  `;

  const teacherBySubjectResult = await executeQuery(teacherBySubjectQuery, [{ name: 'Subject', value: subject }]);

  return res.send(new ApiResponse(200, teacherBySubjectResult.recordset, "Teacher fetched successfully"));
})

export { allocateTeacherSubject, updateTeacherSubject, getAllTeacher, getTeacherById, getTeacherByStd, getTeacherBySubject };