import ApiError from "../config/ApiError.js";
import ApiResponse from "../config/ApiResponse.js";
import asyncHandler from "../config/asyncHandler.js";
import uploadCloudinary from "../config/cloudinary.js";
import poolPromise from "../config/dbConnect.js"; // Using poolPromise for DB connection

const uploadFile = asyncHandler(async (req, res) => {
  const data = req.body;
  const { jsonData } = data;
  const { filename, userId } = await JSON.parse(jsonData);
  const filePath = req.file?.path;

  if (!filename || !userId) {
    throw new ApiError(400, "All fields are required!");
  }

  if (!filePath) {
    throw new ApiError(400, "File is missing");
  }

  // Upload file to Cloudinary
  const file = await uploadCloudinary(filePath);

  const parsedUserId = parseInt(userId);
  const pool = await poolPromise;
  const request = pool.request();

  // Check if the user exists
  const userQuery = `
    SELECT id FROM Users WHERE id = @UserId;
  `;
  const userResult = await request.input('UserId', parsedUserId).query(userQuery);

  if (userResult.recordset.length === 0) {
    throw new ApiError(400, "User not found..");
  }

  // Update document for the user in the Teacher table
  const updateDocumentQuery = `
    UPDATE Documents
    SET fileName = @FileName, fileUrl = @FileUrl
    WHERE teacherId IN (SELECT id FROM Teachers WHERE userId = @UserId);
  `;
  await request
    .input('FileName', filename)
    .input('FileUrl', file.url)
    .input('UserId', parsedUserId)
    .query(updateDocumentQuery);

  // If you need to update or add additional data related to the teacher
  const teacherQuery = `
    SELECT * FROM Teachers WHERE userId = @UserId;
  `;
  const teacherResult = await request.input('UserId', parsedUserId).query(teacherQuery);

  if (teacherResult.recordset.length === 0) {
    throw new ApiError(400, "Teacher data not found..");
  }

  const teacher = teacherResult.recordset[0];

  return res.send(new ApiResponse(200, { teacher }, "File uploaded"));
});

export { uploadFile };
