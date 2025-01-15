import sql from 'mssql';

const poolPromise = new sql.ConnectionPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: true, // Use this for Azure SQL
    trustServerCertificate: true, // Change to false for production
  },
}).connect();

export default poolPromise;
