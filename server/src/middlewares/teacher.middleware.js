import joi from "joi";
import ApiError from "../config/ApiError.js";

const teacherSchema = joi.object({
  fname: joi.string().required(),
  mname: joi.string().required(),
  lname: joi.string().required(),
  address: joi.string().required(),
  gender: joi.string().required(),
  dob: joi.string()
        .pattern(/^([0-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/)
        .required(),
  email: joi.string().email().required(),
  password: joi.string().min(4).max(16).required(),
  phone: joi.string().required(),
  role: joi.string().required(),      
  subject: joi.array()
    .items(joi.string().required())
    .min(1)
    .required(),
})


const validateCreateTeacherData = (req, res, next) => {
  const { error } = teacherSchema.validate(req.body);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  next();
}

export { validateCreateTeacherData };