import xlsx from 'xlsx';
import asyncHandler from '../config/asyncHandler.js';
import ApiResponse from '../config/ApiResponse.js';
import ApiError from '../config/ApiError.js';
import { executeQuery } from '../config/executeQuery.js';


const parseAndInsertExamData = async (filePath, examName) => {
  // 1) Read the workbook
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  // 2) Convert the sheet to JSON array
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  // 3) For each row, do the DB operations
  for (const row of jsonData) {
    // Adjust property names if your Excel columns differ
    const {
      sr_no,
      roll_no,
      student_name,
      marks,
      // If you have a date column in your Excel, e.g. "date",
      // rename it here and parse it:
      // date
    } = row;

    // Basic validation
    if (!roll_no || !student_name || !marks) {
      throw new ApiError(400, 'Missing required columns: roll_no, student_name, marks');
    }

    // 3a) Check if the student already exists
    let selectStudentQuery = `
      SELECT stu_id
      FROM Student_Dummy
      WHERE roll_no = @roll_no
    `;
    let existingStudent = await executeQuery(selectStudentQuery, [
      { name: 'roll_no', value: roll_no },
    ]);

    let studentId;

    if (existingStudent.recordset.length > 0) {
      // Student found
      studentId = existingStudent.recordset[0].stu_id;
    } else {
      // Student not found - either create or throw error
      // For demonstration, let's create a minimal Student_Dummy record:
      // We'll store the entire 'student_name' in firstname,
      // leave lastname/phone/course_name as placeholders.
      let insertStudentQuery = `
        INSERT INTO Student_Dummy (firstname, lastname, roll_no, phone, course_name)
        OUTPUT INSERTED.stu_id
        VALUES (@firstname, @lastname, @roll_no, @phone, @course_name)
      `;
      let insertedStudent = await executeQuery(insertStudentQuery, [
        { name: 'firstname', value: student_name }, // or split into first/last
        { name: 'lastname', value: '' },
        { name: 'roll_no', value: roll_no },
        { name: 'phone', value: '' },
        { name: 'course_name', value: examName }, // e.g. store examName as course
      ]);

      studentId = insertedStudent.recordset[0].stu_id;
    }

    // 3b) Insert into Exams_Dummy
    // We only have one 'marks' column in the Excel, but your table has 3 subjects.
    // For demonstration, let's store that single 'marks' in phy_marks and set the rest to 0.
    let insertExamQuery = `
      INSERT INTO Exams_Dummy (examname, exam_date, phy_marks, chemistry_marks, maths_marks, Student_ID)
      VALUES (@examname, @exam_date, @phy_marks, @chemistry_marks, @maths_marks, @student_id)
    `;

    // If you want a specific date from Excel, parse it here
    // const examDate = date ? new Date(date) : new Date(); // if 'date' field exists
    // If not provided, default to today's date:
    const examDate = new Date();

    await executeQuery(insertExamQuery, [
      { name: 'examname', value: examName },
      { name: 'exam_date', value: examDate },
      { name: 'phy_marks', value: marks },
      { name: 'chemistry_marks', value: 0 },
      { name: 'maths_marks', value: 0 },
      { name: 'student_id', value: studentId },
    ]);
  }
};


const markUploadJee = asyncHandler(async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, 'No file uploaded');
    }
    await parseAndInsertExamData(req.file.path, 'JEE');

    return res
      .status(200)
      .json(new ApiResponse(200, null, 'JEE marks uploaded successfully'));
  } catch (error) {
    next(error);
  }
});


const markUploadNeet = asyncHandler(async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, 'No file uploaded');
    }
    await parseAndInsertExamData(req.file.path, 'NEET');

    return res
      .status(200)
      .json(new ApiResponse(200, null, 'NEET marks uploaded successfully'));
  } catch (error) {
    next(error);
  }
});


const markUploadCet = asyncHandler(async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, 'No file uploaded');
    }
    await parseAndInsertExamData(req.file.path, 'CET');

    return res
      .status(200)
      .json(new ApiResponse(200, null, 'CET marks uploaded successfully'));
  } catch (error) {
    next(error);
  }
});

export {
  markUploadCet,
  markUploadJee,
  markUploadNeet
}