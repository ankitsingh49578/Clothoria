import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  addNewUser,
  deleteUser,
  showAllUsers,
  updateUserInfo,
} from "../controllers/admin.controller.js";

const router = express.Router();

// @route GET /api/admin/users
// Get all users (Admin only)
// access private/admin
router.get("/", protect, admin, showAllUsers);

// @route POST /api/admin/users
// Add a new user (admin only)
// access private/admin
router.post("/", protect, admin, addNewUser);

// @route PUT /api/admin/users/:id
// Update user info (admin only) - name, email and role
// access private/admin
router.put("/:id", protect, admin, updateUserInfo);

// @route DELETE /api/admin/users/:id
// Delete a user (admin only)
// access private/admin
router.delete('/:id', protect, admin, deleteUser)

export default router;
