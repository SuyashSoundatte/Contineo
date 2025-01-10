import pkg from 'pg';
const { Client } = pkg;

const ConnectDB = async () => {
  const url = process.env.DATABASE_URL;

  const client = new Client({ connectionString: url });

  try {
    await client.connect();
    console.log("Connected to the database");
    return client;
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    process.exit(1);
  }
};

export default ConnectDB;
