import sql from "mssql";

const ConnectDB = async () => {
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
  };

  try {
    const pool = await sql.connect(config);
    console.log("Connected to the SQL Server database");
    return pool; 
  } catch (err) {
    console.error("Error connecting to the SQL Server database:", err.message);
    process.exit(1);
  }
};

export default ConnectDB;