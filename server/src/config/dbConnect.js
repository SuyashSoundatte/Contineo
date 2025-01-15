import sql from 'mssql';
import dotenv from "dotenv";
dotenv.config()

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,  // Ensure this is a string
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

console.log(config); // Log the entire config object to ensure everything is correct.

const poolPromise = new sql.ConnectionPool(config).connect();


export default poolPromise;
