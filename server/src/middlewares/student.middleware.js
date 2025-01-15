import joi from "joi";
import ApiError from "../config/ApiError.js";

const studentSchema = joi.object({
  fname: joi.string().required(),
  mname: joi.string().required(),
  lname: joi.string().required(),
  email: joi.string().email().required(),
  phone_number: joi.string().required(),
  address: joi.string().required(),
  password: joi.string().required(),
  roll_no: joi.string().required(),
  gender: joi.string().required(),
  dob: joi.string().pattern(/^([0-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/).required(), 
})


const validStudent = (req, res, next) => {
  const { error } = studentSchema.validate(req.body);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  next();
}

//Student Division validation schema
const studentValidationSchema = joi.object({
  user_id: joi.string().required(),
  roll_no: joi.number().integer().required(),
  class_std: joi.string().min(1).required(),
  div: joi.string().min(1).required()
});

const validStudentDiv = (req, res, next) => {
  const { error } = studentValidationSchema.validate(req.body);
  
  if (error) {
    return next(new ApiError(400, `Validation error(s): "${error.details.map(x => x.message).join(", ")}"`));
  }
    next();
};

export { validStudent, validStudentDiv };