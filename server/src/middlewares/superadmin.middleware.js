import Joi from "joi";
import ApiError from "../config/ApiError.js";

const validUser = (req, res, next) => {
  const schema = Joi.object({
    fname: Joi.string().min(1).max(100).required(),
    mname: Joi.string().min(1).max(100).optional(),
    lname: Joi.string().min(1).max(100).required(),
    address: Joi.string().min(1).max(255).required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    dob: Joi.string()
      .pattern(/^([0-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    phone: Joi.string().required(),
    subjects: Joi.array().items(Joi.string()).optional(), // Assuming an array of subjects for Teacher role
    role: Joi.string().valid('SuperAdmin', 'Teacher', 'OfficeStaff', 'Mentor', 'ClassTeacher', 'ClassTeacherIncharge', 'MentorIncharge').required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: `Validation error(s): ${error.details
        .map((err) => err.message)
        .join(', ')}`
    });
  }

  next();
};

const validLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      status: 400,
      message: `Validation error(s): ${error.details
        .map((err) => err.message)
        .join(', ')}`
    });
  }

  next();
}


export { validUser, validLogin };
