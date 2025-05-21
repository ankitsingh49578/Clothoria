import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  bestSeller,
  createProduct,
  deleteProduct,
  newArrivals,
  showProducts,
  similarProducts,
  singleProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// @route GET /api/products
// Show all the products with optional query filters
// access public
router.get("/", showProducts);

// @route GET /api/products/best-seller
// Show the product with highest rating
// access public
router.get("/best-seller", bestSeller);

// @route GET /api/products/new-arrivals
// Show the products which are gonna arrive soon
// access public
router.get("/new-arrivals", newArrivals);

// @route GET /api/products/:id
// Show a single product
// access public
router.get("/:id", singleProduct);

// @route GET /api/products/similar/:id
// Show similar products based on the current product's gender and category
// access public
router.get("/similar/:id", similarProducts);

// @route POST  /api/products
// @desc  Create a new product
// @access Private/Admin
router.post("/", protect, admin, createProduct);

// @route PUT /api/products/:id
// @desc  Update a product
// @access Private/Admin
router.put("/:id", protect, admin, updateProduct);

// @route DELETE /api/products/:id
// @desc  Delete a product
// @access Private/Admin
router.delete("/:id", protect, admin, deleteProduct);

export default router;
