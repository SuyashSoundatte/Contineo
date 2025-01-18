import asyncHandler from "../config/asyncHandler.js";
import poolPromise from "../config/dbConnect.js";
import ApiError from "../config/ApiError.js";
import ApiResponse from "../config/ApiResponse.js";
import { hashPassword } from "../config/hashPass.js";

const executeQuery = async (query, params) => {
  const pool = await poolPromise;
  const request = pool.request();
  if (params) {
    params.forEach((param) => request.input(param.name, param.value));
  }
  return request.query(query);
};

const createUser = asyncHandler(async (req, res) => {
  const { fname, mname, lname, address, gender, dob, email, password, phone, role, subject, div, std } = req.body;

  if (!fname || !lname || !email || !password || !phone || !role) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const checkEmailQuery = "SELECT COUNT(*) AS count FROM Users WHERE email = @Email";
  const existingEmail = await executeQuery(checkEmailQuery, [{ name: "Email", value: email }]);

  if (existingEmail.recordset[0].count > 0) {
    throw new ApiError(400, "Email already in use");
  }

  const hashedPassword = await hashPassword(password);

  const insertUserQuery = `
    INSERT INTO Users (fname, mname, lname, address, gender, dob, email, password, phone, role)
    OUTPUT INSERTED.user_id
    VALUES (@Fname, @Mname, @Lname, @Address, @Gender, @Dob, @Email, @Password, @Phone, @Role);
  `;
  const userParams = [
    { name: "Fname", value: fname },
    { name: "Mname", value: mname || null },
    { name: "Lname", value: lname },
    { name: "Address", value: address || null },
    { name: "Gender", value: gender || null },
    { name: "Dob", value: dob },
    { name: "Email", value: email },
    { name: "Password", value: hashedPassword },
    { name: "Phone", value: phone },
    { name: "Role", value: role },
  ];

  const userResult = await executeQuery(insertUserQuery, userParams);
  const userId = userResult.recordset[0].user_id;

  if (role === "Teacher") {
    const teacherQuery = `
      INSERT INTO Teachers (user_id, subjects)
      VALUES (@UserId, @Subject);
    `;

    const teacherParams = [
      { name: 'UserId', value: userId },
      { name: 'Subject', value: subject }
    ];

    try {
      const teacherResult = await executeQuery(teacherQuery, teacherParams); 
    } catch (error) {
      console.error("Error while inserting teacher:", error);
      throw new ApiError(500, "Error inserting teacher data.");
    }
  }

  if (role === "ClassTeacher"){
    const ctQuery = `
      insert into ClassTeacher_Allocates(user_id, std, div) into (@UserId, @Std, @Div);
    `

    const ctParams = [
      { name:"UserId", value: userId },
      { name:"Std", value: div },
      { name:"Div", value: std }
    ]

    try {
      const ctResult = await executeQuery(ctQuery, ctParams);
    } catch (error) {
      console.error("Error while inserting teacher:", error);
      throw new ApiError(500, "Error inserting teacher data.");
    }

  }

  if (role === "Mentor"){
    const ctQuery = `
      insert into Mentor_Allocates (user_id, std, div) into (@UserId, @Std, @Div);
    `

    const ctParams = [
      { name:"UserId", value: userId },
      { name:"Std", value: div },
      { name:"Div", value: std }
    ]

    try {
      const ctResult = await executeQuery(ctQuery, ctParams);
    } catch (error) {
      console.error("Error while inserting teacher:", error);
      throw new ApiError(500, "Error inserting teacher data.");
    }
  }

  return res.send(new ApiResponse(201, { id: userId, email }, "User created successfully"));
});

export { createUser };
