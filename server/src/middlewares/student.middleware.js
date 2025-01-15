import joi from "joi";
import ApiError from "../config/ApiError.js";

const studentSchema = joi.object({
  fname: joi.string().required(),
  mname: joi.string().required(),
  lname: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.string().required(),
  address: joi.string().required(),
  rollnumber: joi.string().required(),
  gender: joi.string().required(),
  DOB: joi.string().pattern(/^([0-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/).required(), 
})


const validStudent = (req, res, next) => {
  const { error } = studentSchema.validate(req.body);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  next();
}

export { validStudent };