import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from "../models/categoryModel.js";

export const getCategories = async (req, res) => {
  const categories = await getAllCategories();
  res.json(categories);
};

export const addCategory = async (req, res) => {
  const { name, description } = req.body;
  const category = await createCategory(name, description);
  res.json(category);
};

export const removeCategory = async (req, res) => {
  const { id } = req.params;
  const { adminPassword } = req.body;

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ error: "Forbidden" });
  }

  await deleteCategory(id);
  res.sendStatus(204);
};
