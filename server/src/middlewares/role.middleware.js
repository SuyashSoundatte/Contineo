import ApiError from "../config/ApiError.js"

const authRole = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;
    
    if (!user) {
      return new ApiError(401,"Unauthorized! No user information found.");
    }
    
    if (!allowedRoles.includes(user.role)) {
      return new ApiError(403,"Unauthorized! User role is not allowed.");
    }
    
    next();
  };
};

export default authRole;
