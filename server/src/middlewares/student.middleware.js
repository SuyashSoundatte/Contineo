import joi from "joi";
import ApiError from "../config/ApiError.js";

const studentSchema = joi.object({
  fname: joi.string().required(),
  mname: joi.string().required(),
  lname: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.string().required(),
  address: joi.string().required(),
  roll_no: joi.string().required(),
  gender: joi.string().required(),
  dob: joi.string().pattern(/^([0-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/).required(),
  class_std: joi.string().required() 
})


const validStudent = (req, res, next) => {
  const { error } = studentSchema.validate(req.body);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  next();
}

const studentValidationSchema = joi.object({
  userId: joi.string().required(),
  stdId: joi.string().min(1).required(),
  divId: joi.string().min(1).required()
});

const validStudentDiv = (req, res, next) => {
  const { error } = studentValidationSchema.validate(req.body);
  
  if (error) {
    return next(new ApiError(400, `Validation error(s): "${error.details.map(x => x.message).join(", ")}")`));
  }
    next();
};

const getStudentId = (req, res, next) => {
  const { userId } = req.body;
  if(!userId){
    throw new ApiError(400, `Validation error(s): "${error.details.map(x => x.message).join(", ")}"`);
  }
  next();
};

export { validStudent, validStudentDiv, getStudentId };