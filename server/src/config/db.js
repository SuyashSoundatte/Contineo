import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 1433,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

const ConnectDB = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("Connected to MSSQL");
    return pool;
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};

export default ConnectDB;
