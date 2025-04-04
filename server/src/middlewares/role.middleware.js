import ApiError from "../config/ApiError.js";

const authRole = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) return next(new ApiError(401, "No user information found"));
    if (!allowedRoles.includes(user.role)) {
      return next(new ApiError(403, "Access denied for your role"));
    }

    next();
  };
};

export default authRole;
