// routes/itemRoutes.js
import express from "express";
import {
  getItems,
  addItem,
  updateItem,
  removeItem,
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/", getItems);
router.post("/", addItem);
router.put("/:id", updateItem);
router.delete("/:id", removeItem);

export default router;
