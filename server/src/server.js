import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser"
import GlobalErrorHandler from "./config/errorHandler.js";

// db paths 
import ConnectDB from "./config/db.js";

// routes paths
import superadmin from "./routes/superadmin.routes.js";
import file from "./routes/file.routes.js"
import student from "./routes/student.routes.js";
import teacher from "./routes/teacher.routes.js";
import classTeacher from "./routes/classTeacher.routes.js";
import mentor from "./routes/mentor.routes.js"

const app = express();
const port = process.env.PORT || 8080;

// middlewares
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', superadmin);
app.use('/api/v1', file);
app.use('/api/v1', student);
app.use('/api/v1', teacher);
app.use('/api/v1', mentor);
app.use('/api/v1', classTeacher);
app.use(GlobalErrorHandler);


  

function serverStart() {
  Promise.all([ConnectDB()])
  .then(() => {
    app.on("error", (err) => {
      throw err;
    });
    app.listen(port,() => {
      console.log(`server started at http://localhost:${port}`);
    });

    app.get("/", (req, res) => {
      res.send("Yare Yare..! Yokoso watashino Servar des");
    });
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
}  

serverStart()