import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { showAllOrders, showOrderDetail } from "../controllers/order.controller.js";

const router = express.Router();

// @route GET /api/orders/my-orders
// Get logged-in user's orders
// access private
router.get("/my-orders", protect, showAllOrders);

// @route GET /api/orders/:id
// Get order details by ID
// access private
router.get('/:id', protect, showOrderDetail)

export default router;
