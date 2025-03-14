import xlsx from "xlsx";
import fs from "fs";
import path from "path";
import { executeQuery } from "../config/executeQuery.js";
import ApiError from "../config/ApiError.js";
import ApiResponse from "../config/ApiResponse.js";
import asyncHandler from "../config/asyncHandler.js";

const parseExcelFile = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
};

const processAndStoreMarks = async (data, examName) => {
  for (const row of data) {
    const { roll_no, ...marks } = row; 

    const studentQuery = "SELECT stu_id FROM Student_Dummy WHERE roll_no = $1";
    const studentResult = await executeQuery(studentQuery, [
      { name: "roll_no", value: roll_no },
    ]);

    if (studentResult.rows.length === 0) {
      console.warn(`⚠️ Student with roll_no ${roll_no} not found! Skipping.`);
      continue;
    }

    const stu_id = studentResult.rows[0].stu_id;

    for (const [exam_date, mark] of Object.entries(marks)) {
      const insertQuery = `
        INSERT INTO Exams_Dummy (examname, exam_date, marks, Student_ID)
        VALUES ($1, $2, $3, $4)
      `;

      await executeQuery(insertQuery, [
        { name: "examname", value: examName },
        { name: "exam_date", value: exam_date },
        { name: "marks", value: mark.toString() },
        { name: "Student_ID", value: stu_id },
      ]);
    }
  }
};

export const uploadMarks = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ApiError(400, "No file uploaded"));
  }

  const filePath = path.join(process.cwd(), "uploads", req.file.filename);
  const fileName = req.file.originalname.toLowerCase();

  let examType = null;
  if (fileName.includes("jee")) {
    examType = "JEE";
  } else if (fileName.includes("neet")) {
    examType = "NEET";
  } else if (fileName.includes("cet")) {
    examType = "CET";
  } else {
    fs.unlinkSync(filePath);
    return next(new ApiError(400, "Invalid file. Must contain 'jee', 'neet', or 'cet' in the filename."));
  }

  const data = parseExcelFile(filePath);
  await processAndStoreMarks(data, examType);

  fs.unlinkSync(filePath);

  res.json(new ApiResponse(200, {}, `Marks for ${examType} uploaded successfully`));
});
