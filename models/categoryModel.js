import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const getAllCategories = async () => {
  const result = await pool.query("SELECT * FROM categories");
  return result.rows;
};

export const createCategory = async (name, description) => {
  const result = await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );
  return result.rows[0];
};

export const deleteCategory = async (id) => {
  await pool.query("DELETE FROM items WHERE category_id = $1", [id]);
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
};
