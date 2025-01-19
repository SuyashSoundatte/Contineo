import asyncHandler from "../config/asyncHandler.js";
import ApiResponse from "../config/ApiResponse.js";
import poolPromise from "../config/dbConnect.js";

const getAllMentor = asyncHandler(async (req, res) => {
  const pool = await poolPromise;
  const request = pool.request();

  const usersQuery = `
      SELECT u.user_id, u.email, u.fname, u.lname, u.role, u.phone, u.gender, MA.std, MA.div, MA.mentor_id
      FROM Users u
      LEFT JOIN Mentor_Allocates MA ON u.user_id = MA.user_id
      WHERE u.role = 'Mentor';

    `;

  const usersResult = await request.query(usersQuery);

  return res.send(
    new ApiResponse(200, usersResult.recordset, "Mentor fetched successfully")
  );
});

export { getAllMentor };
