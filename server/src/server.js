import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import GlobalErrorHandler from "./config/errorHandler.js";
import helmet from "helmet"

import ConnectDB from "./config/db.js";

import superadmin from "./routes/superadmin.routes.js";
import file from "./routes/file.routes.js"
import student from "./routes/student.routes.js";
import teacher from "./routes/teacher.routes.js";
import classTeacher from "./routes/classTeacher.routes.js";
import mentor from "./routes/mentor.routes.js"

import marksRoutes_dummy from "./dummy/marksRoutes.js"
import StuDummyRoutes from "./dummy/StuDummyRoutes.js"
import marksRoutes from "./dummy/marksRoutes.js"

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/marks', marksRoutes_dummy);
app.use('/api/marks', marksRoutes);
app.use('/api/v1', StuDummyRoutes);

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