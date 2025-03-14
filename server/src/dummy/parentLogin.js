import { Router } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../config/ApiError.js";
import ApiResponse from "../config/ApiResponse.js";
import asyncHandler from "../config/asyncHandler.js";
import { executeQuery } from "../config/executeQuery.js";

const router = Router();

router.post("/parentLogin", asyncHandler(async (req, res, next) => {
    const { phone, password } = req.body;

    if (!phone || !password) {
      throw ApiError(400, "Phone and Password are required");
    }

    const query = "SELECT * FROM Student_Dummy WHERE phone = $1";
    const result = await executeQuery(query, [{ name: "phone", value: phone }]);

    if (result.rows.length === 0) {
      throw ApiError(401, "Invalid credentials");
    }

    const user = result.rows[0];

    if (user.phone !== password) {
      throw ApiError(401, "Invalid credentials");
    }

    const token = jwt.sign(
      { stu_id: user.stu_id, phone: user.phone },
      process.env.JWT_SEC,
      { expiresIn: "1h" }
    );

    res.send(new ApiResponse(200, { token }, "Login successful"));
  })
);

export default router;
