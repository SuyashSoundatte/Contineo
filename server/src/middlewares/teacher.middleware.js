import joi from "joi";
import ApiError from "../config/ApiError.js";

const studentSchema = joi.object({
  user_id: joi.string().required(),
  fname: joi.string().required(),
  lname: joi.string().required(),
  subject: joi.string().required(),
  subject_id: joi.string().required(),
  standard_name: joi.string().required(),
  subject_name: joi.string().required(),
  class_std: joi.string().required(),
  div: joi.string().required(),
})


const validTeacherData = (req, res, next) => {
  const { error } = studentSchema.validate(req.body);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  next();
}

export { validTeacherData };