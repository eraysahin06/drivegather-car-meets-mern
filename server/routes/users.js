const express = require('express');
const router = express.Router();
const User = require('../models/User/User');

// Get user by ID route
router.get("/id/:userId", async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get user by email route
  router.get("/:email", async (req, res) => {
    const { email } = req.params;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Add user route
  router.post("/", async (req, res) => {
    const { firebaseId, displayName, email, username, photoURL } = req.body;
    try {
      let user = await User.findOneAndUpdate(
        { firebaseId },
        { displayName, email, username, photoURL },
        { new: true, upsert: true }
      );
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Update user route
  router.put("/:email", async (req, res) => {
    const { email } = req.params;
    const { username } = req.body;
  
    try {
      const user = await User.findOneAndUpdate(
        { email },
        { username },
        { new: true }
      );
      res.status(200).json(user);
    } catch (error) {
      console.error("Server error:", error); // Log the error
      res.status(400).json({ message: error.message });
    }
  });
  
  // Check if a username already exists
  router.get("/username/:username", async (req, res) => {
    const { username } = req.params;
  
    try {
      const user = await User.findOne({ username });
  
      if (user) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;