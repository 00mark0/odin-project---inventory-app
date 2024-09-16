// clearItems.js
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const clearItems = async () => {
  try {
    await pool.query("TRUNCATE TABLE items RESTART IDENTITY;");
    console.log("Items table cleared successfully.");
  } catch (err) {
    console.error("Error clearing items table:", err);
  } finally {
    await pool.end();
  }
};

clearItems();
