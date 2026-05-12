import express from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct, getExpiryProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/expiry", getExpiryProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
