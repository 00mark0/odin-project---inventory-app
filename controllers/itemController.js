// controllers/itemController.js
import {
  getAllItems,
  createItem,
  updateItemById,
  deleteItemById,
} from "../models/itemModel.js";

export const getItems = async (req, res) => {
  const { category_id } = req.query || {};
  if (!category_id) {
    return res.status(400).json({ error: "category_id is required" });
  }
  const items = await getAllItems(category_id);
  res.json(items);
};

export const addItem = async (req, res) => {
  const { name, description, category_id, quantity, price } = req.body;
  if (!category_id) {
    return res.status(400).json({ error: "category_id is required" });
  }
  const item = await createItem(
    name,
    description,
    category_id,
    quantity,
    price
  );
  res.json(item);
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, quantity, price, adminPassword } = req.body;

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const item = await updateItemById(id, name, description, quantity, price);
  res.json(item);
};

export const removeItem = async (req, res) => {
  const { id } = req.params;
  const { adminPassword } = req.body;

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ error: "Forbidden" });
  }

  await deleteItemById(id);
  res.sendStatus(204);
};
