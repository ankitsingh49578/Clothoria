import express from "express";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// route POST /api/users/register
// @description Register a new user
// @access Public
router.post("/register", registerUser);

// route POST /api/users/login
// @description Authenticate a user
// @access Public
router.post('/login', loginUser)

// route GET /api/users/profile
// @description Get user profile
// @access Private
router.get('/profile', protect, async(req, res) => {
    res.json(req.user);
})

export default router;
