import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addToCart,
  deleteProduct,
  mergeCart,
  showCart,
  updateCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

// @route POST /api/cart
// Add a product to the cart for a guest or logged in user
// access public
router.post("/", addToCart);

// @route PUT /api/cart
// Update product quantity in the cart for a guest or logged-in user
// access public
router.put("/", updateCart);

// @route DELETE  /api/cart
// Delete a product from the cart
// access public
router.delete("/", deleteProduct);

// @route GET /api/cart
// Get logged-in user's or guest user's cart (displaying the cart)
// access public
router.get("/", showCart, mergeCart);

// @route POST /api/cart/merge
// Merge guest cart into user cart on login
// access private
router.post("/merge", protect, mergeCart);

export default router;
