import asyncHandler from "../config/asyncHandler.js";
import poolPromise from "../config/dbConnect.js";
import ApiError from "../config/ApiError.js";
import ApiResponse from "../config/ApiResponse.js";

// Function to fetch all teachers
const getTeachers = asyncHandler(async (req, res) => {
  const pool = await poolPromise;
  const request = pool.request();
  
  // SQL query to fetch teachers with role 'Teacher'
  const teachersQuery = `
    SELECT email, fname, lname, role, phone, gender 
    FROM Users 
    WHERE role = 'Teacher'
    ORDER BY id ASC;
  `;

  // Execute the query
  const teachersResult = await request.query(teachersQuery);

  return res.send(new ApiResponse(201, teachersResult.recordset, "Teachers found successfully"));
});

// Function to fetch a teacher by ID
const getTeacherById = asyncHandler(async (req, res) => {
  const { teacherId } = req.params;
  const parsedTeacherID = parseInt(teacherId);

  if (isNaN(parsedTeacherID)) {
    throw new ApiError(400, "Invalid teacher ID");
  }

  const pool = await poolPromise;
  const request = pool.request();

  // SQL query to fetch teacher details along with documents
  const teacherQuery = `
    SELECT t.id, u.fname, u.mname, u.lname, u.email, u.phone, u.DOB, u.gender, u.role, u.isActive, 
           d.fileName, d.fileUrl, d.createdAt, d.updatedAt
    FROM Teachers t
    JOIN Users u ON u.id = t.userId
    LEFT JOIN Documents d ON d.teacherId = t.id
    WHERE t.id = @TeacherId;
  `;

  // Execute the query with teacherId parameter
  const teacherResult = await request.input('TeacherId', parsedTeacherID).query(teacherQuery);

  if (teacherResult.recordset.length === 0) {
    throw new ApiError(404, "Teacher not found");
  }

  return res.send(new ApiResponse(200, teacherResult.recordset[0], "Teacher found successfully"));
});

export { getTeachers, getTeacherById };
