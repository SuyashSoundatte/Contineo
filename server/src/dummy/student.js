import { Router } from "express";
import ApiError from "../config/ApiError.js";
import { executeQuery } from "../config/executeQuery.js";
import ApiResponse from "../config/ApiResponse.js";
import asyncHandler from "../config/asyncHandler.js";

const router = Router();

router.post('/students', asyncHandler(async(req, res)=>{
  const { firstname, lastname, roll_no } = req.body;

  if (!firstname || !lastname || !roll_no) {
    throw new ApiError(400, 'Please provide valid firstname, lastname and rollno data');
  }

  const studentExistsQuery = `
    select roll_no from Student_Dummy where roll_no = @rollno
  `

  const studentData = [
    { name: "firstname", value: firstname },
    { name: "lastname", value: lastname },
    { name: 'roll_no', value: roll_no }
  ]

  const studentExists = await executeQuery(studentExistsQuery, studentData);

  if (studentExists.recordset.length > 0) {
    throw new ApiError(400, 'Student already exists');
  }

  const studentInsertQuery = `
    insert into Student_Dummy (firstname, lastname, roll_no) 
    values (@firstname, @lastname, @roll_no)
  `

  const student = await executeQuery(studentInsertQuery, studentData);

  return res.send(new ApiResponse(200, student.recordset.rows[0], 'Student created successfully'));
}));

router.get('/students/:roll_no', asyncHandler(async(req, res)=>{
  const { roll_no } = req.params;

  if (!roll_no) {
    throw new ApiError(400, 'Please provide valid rollno data');
  }

  const studentQuery = `
    select * from Student_Dummy where roll_no = @rollno
  `

  const student = await executeQuery(studentQuery, [{ name: 'rollno', value: roll_no }]);

  return res.send(new ApiResponse(200, student.recordset.rows[0], 'Student retrieved successfully'));
})) 

export default router;