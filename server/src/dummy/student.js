import ApiError from "../config/ApiError.js";
import { executeQuery } from "../config/executeQuery.js";
import ApiResponse from "../config/ApiResponse.js";
import asyncHandler from "../config/asyncHandler.js";


const createStu = asyncHandler(async(req, res)=>{
  const { firstname, lastname, roll_no, phone } = req.body;

  if (!firstname || !lastname || !roll_no || !phone) {
    throw new ApiError(400, 'Please provide valid firstname, lastname, rollno and phone');
  }

  const studentExistsQuery = `
    select roll_no from Student_Dummy where roll_no = @roll_no
  `

  const studentData = [
    { name: "firstname", value: firstname },
    { name: "lastname", value: lastname },
    { name: 'roll_no', value: roll_no },
    { name: 'phone', value: phone}
  ]

  const studentExists = await executeQuery(studentExistsQuery, studentData);

  if (studentExists.recordset.length > 0) {
    throw new ApiError(400, 'Student already exists');
  }

  const studentInsertQuery = `
    insert into Student_Dummy (firstname, lastname, roll_no, phone) 
    values (@firstname, @lastname, @roll_no, @phone)
  `

  const student = await executeQuery(studentInsertQuery, studentData);

  return res.send(new ApiResponse(200, student.recordset?.rows?.[0] || {}, 'Student created successfully'));
});

const getStuByRoll = asyncHandler(async (req, res) => {
  let { phone } = req.params;

  if (!phone) {
    throw new ApiError(400, 'Please provide a valid roll number');
  }

  const studentQuery = `SELECT * FROM Student_Dummy WHERE phone = @phone`;

  const student = await executeQuery(studentQuery, [{ name: 'phone', value: phone }]);

  if (!student.recordset || student.recordset.length === 0) {
    throw new ApiError(404, 'Student not found');
  }

  const query_marks = `
    select * from Exams_Dummy where Student_ID = @stu_id
  `
  const query_value = [
    { name: "stu_id", value: student.recordset[0].stu_id}
  ]

  const result_marks = await executeQuery(query_marks, query_value);

  return res.send(new ApiResponse(200, { student: student.recordset[0], result_marks: result_marks.recordset }, 'Student retrieved successfully'));
});


export { createStu, getStuByRoll };