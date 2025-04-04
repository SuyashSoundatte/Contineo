import jwt from "jsonwebtoken";
import ApiError from "../config/ApiError.js";

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError(401, "No token provided"));
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SEC);

    req.user = decoded;
    next();
  } catch (error) {
    next(new ApiError(403, "Invalid or expired token", [], error.stack));
  }
};

export default verifyToken;
