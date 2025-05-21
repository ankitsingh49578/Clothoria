import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { showAllProducts } from "../controllers/productAdmin.controller.js";


const router = express.Router();

// @router GET /api/admin/products
// Get all products (admin only)
// access private/admin
router.get('/', protect, admin, showAllProducts)


export default router;