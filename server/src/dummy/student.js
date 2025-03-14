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
  let { roll_no } = req.params;

  roll_no = roll_no.replace(/[^0-9]/g, ''); 

  if (!roll_no || isNaN(roll_no)) {
    throw new ApiError(400, 'Please provide a valid roll number');
  }

  const studentQuery = `SELECT * FROM Student_Dummy WHERE roll_no = @roll_no`;

  const student = await executeQuery(studentQuery, [{ name: 'roll_no', value: parseInt(roll_no) }]);

  if (!student.recordset || student.recordset.length === 0) {
    throw new ApiError(404, 'Student not found');
  }

  return res.send(new ApiResponse(200, student.recordset[0], 'Student retrieved successfully'));
});


export { createStu, getStuByRoll };