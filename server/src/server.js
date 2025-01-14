import dotenv from "dotenv";
dotenv.config();

import express from "express";
import fileUpload from 'express-fileupload';
import cors from "cors";
import bodyParser from "body-parser"
import GlobalErrorHandler from "./config/errorHandler.js";

// db paths 
import ConnectDB from "./config/db.js";

// routes paths
import superadmin from "./routes/superadmin.routes.js";

const app = express();
const port = process.env.PORT || 8080;

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173/",
  })
);
// middlewares
app.use(cors({
  origin: "http://localhost:5173/",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/api/v1', superadmin);
app.use((req, res, next) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  console.log('Request Method:', req.method);
  console.log('Request URL:', req.url);
  next();
});
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