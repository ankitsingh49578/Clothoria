import express, { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createCheckout,
  finalizeCheckout,
  updateCheckout,
} from "../controllers/checkout.controller.js";

const router = express.Router();

// @route POST /api/checkout
// Create a new checkout session
// access private
router.post("/", protect, createCheckout);

// @route PUT /api/checkout/:id/pay
// Update checkout to mark as paid after successful payment
// access private
router.put("/:id/pay", protect, updateCheckout);

// @route POST /api/checkout/:id/finalize
// Finalize checkout and convert to an order after payment confirmation
// access private
router.post('/:id/finalize', protect, finalizeCheckout)

export default router;
