// models/itemModel.js
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const getAllItems = async (categoryId) => {
  const result = await pool.query(
    "SELECT * FROM items WHERE category_id = $1",
    [categoryId]
  );
  return result.rows;
};

export const createItem = async (
  name,
  description,
  categoryId,
  quantity,
  price
) => {
  const result = await pool.query(
    "INSERT INTO items (name, description, category_id, quantity, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, description, categoryId, quantity, price]
  );
  return result.rows[0];
};

export const updateItemById = async (
  id,
  name,
  description,
  quantity,
  price
) => {
  const result = await pool.query(
    "UPDATE items SET name = $1, description = $2, quantity = $3, price = $4 WHERE id = $5 RETURNING *",
    [name, description, quantity, price, id]
  );
  return result.rows[0];
};

export const deleteItemById = async (id) => {
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
};
