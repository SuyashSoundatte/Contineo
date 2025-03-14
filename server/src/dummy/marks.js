import xlsx from "xlsx";
import fs from "fs";
import path from "path";
import { executeQuery } from "../config/executeQuery.js";
import ApiError from "../config/ApiError.js";
import ApiResponse from "../config/ApiResponse.js";
import asyncHandler from "../config/asyncHandler.js";

// ✅ Function to parse Excel file
const parseExcelFile = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
};

// ✅ Function to process and store marks in the database
const processAndStoreMarks = async (data, examName) => {
  for (const row of data) {
    const { roll_no, ...marks } = row; // Extract roll_no and marks

    // ✅ Check if student exists
    const studentQuery = "SELECT stu_id FROM Student_Dummy WHERE roll_no = @roll_no";
    const studentResult = await executeQuery(studentQuery, [{ name: "roll_no", value: roll_no }]);

    if (!studentResult.recordset || studentResult.recordset.length === 0) {
      console.warn(`⚠️ Student with roll_no ${roll_no} not found! Skipping.`);
      continue;
    }

    const stu_id = studentResult.recordset[0].stu_id; // Fetch Student ID

    // ✅ Insert marks for each subject/date
    for (const [exam_date, mark] of Object.entries(marks)) {
      if (!mark || isNaN(mark)) continue; // Skip invalid marks

      const insertQuery = `
        INSERT INTO Exams_Dummy (examname, exam_date, marks, Student_ID)
        VALUES (@examname, @exam_date, @marks, @Student_ID)
      `;

      await executeQuery(insertQuery, [
        { name: "examname", value: examName },
        { name: "exam_date", value: new Date(exam_date) }, // Ensure correct date format
        { name: "marks", value: mark.toString() },
        { name: "Student_ID", value: stu_id },
      ]);
    }
  }
};

// ✅ Controller to handle file upload and processing
export const uploadMarks = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ApiError(400, "No file uploaded"));
  }

  const filePath = path.join(process.cwd(), "uploads", req.file.filename);
  const fileName = req.file.originalname.toLowerCase();

  // ✅ Detect Exam Type from File Name
  let examType = null;
  if (fileName.includes("jee")) {
    examType = "JEE";
  } else if (fileName.includes("neet")) {
    examType = "NEET";
  } else if (fileName.includes("cet")) {
    examType = "CET";
  } else {
    fs.unlinkSync(filePath); // Remove invalid file
    return next(new ApiError(400, "Invalid file. Must contain 'jee', 'neet', or 'cet' in the filename."));
  }

  const data = parseExcelFile(filePath); // Read Excel data
  await processAndStoreMarks(data, examType); // Insert into DB

  fs.unlinkSync(filePath); // Delete file after processing

  res.json(new ApiResponse(200, {}, `Marks for ${examType} uploaded successfully`));
});
