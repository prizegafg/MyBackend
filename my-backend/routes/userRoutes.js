const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all users (Protected)
router.get("/", authMiddleware, async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Get single user
router.get("/:id", authMiddleware, async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

// Update user
router.put("/:id", authMiddleware, async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
});

// Delete user
router.delete("/:id", authMiddleware, async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
});

module.exports = router;
