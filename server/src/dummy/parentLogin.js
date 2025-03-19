import jwt from "jsonwebtoken";
import ApiError from "../config/ApiError.js";
import ApiResponse from "../config/ApiResponse.js";
import asyncHandler from "../config/asyncHandler.js";
import { executeQuery } from "../config/executeQuery.js";


// const parentLogin = asyncHandler(async (req, res, next) => {
//   const { phone, password } = req.body;

//   if (!phone || !password) {
//       throw new ApiError(400, "Phone and Password are required");
//   }

//   const query = "SELECT * FROM Student_Dummy WHERE phone = @phone and phone = @password";
//   const result = await executeQuery(query, [{ name: "phone", value: phone }, { name: "password", value: password }]);

//   // Ensure result has the expected structure
//   if (!result || !result.recordset || result.recordset.length === 0) {
//       throw new ApiError(401, "Invalid credentials");
//   }

//   const user = result.recordset[0]; // Use recordset instead of rows
// //   console.log(user);

//   const token = jwt.sign(
//       { stu_id: user.stu_id, phone: result.recordset[0].stu_id },
//       process.env.JWT_SEC,
//       { expiresIn: "1h" }
//   );
// //   console.log(result_marks)


//   res.send(new ApiResponse(200, { token }, "Login successful"));
// });



const parentLogin = asyncHandler(async (req, res, next) => {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
        throw new ApiError(400, "Mobile and Password are required");
    }

    const query = "SELECT * FROM m_student WHERE mobile = @mobile";
    const result = await executeQuery(query, [{ name: "mobile", value: mobile }]);

    if (!result || !result.recordset || result.recordset.length === 0) {
        throw new ApiError(401, "Invalid credentials");
    }

    const user = result.recordset[0];

    if (password !== user.mobile) {
        throw new ApiError(401, "Invalid credentials");
    }

    const token = jwt.sign(
        { stu_id: user.stu_id, phone: user.mobile },
        process.env.JWT_SEC,
        { expiresIn: "1h" }
    );

    res.send(new ApiResponse(200, { token }, "Login successful"));
});


export { parentLogin };