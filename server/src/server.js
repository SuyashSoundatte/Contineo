import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import cors from "cors";
import GlobalErrorHandler from "./config/errorHandler.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173/",
  })
);
app.use(express.json());

app.use(GlobalErrorHandler);
  

function serverStart() {
  ConnectDB()
  .then(() => {
    app.on("error", (err) => {
      throw err;
    });
    app.listen(port, '0.0.0.0',() => {
      console.log(`server started at http://0.0.0.0:${port}`);
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