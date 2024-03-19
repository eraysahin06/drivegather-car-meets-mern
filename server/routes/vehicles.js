const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle/Vehicle');
const User = require('../models/User/User');

// Get user's vehicles route
router.get("/", async (req, res) => {
    const { userEmail } = req.query;
  
    try {
      if (!userEmail) {
        return res.status(400).json({ message: "User email is required" });
      }
  
      // Find the user by email
      const user = await User.findOne({ email: userEmail });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Find vehicles associated with the user's email
      const vehicles = await Vehicle.find({ userEmail: user.email });
  
      res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Add vehicle route
  router.post("/", async (req, res) => {
    const { make, model, year, userEmail } = req.body;
    console.log("Received data:", req.body);
  
    try {
      // Find the user by email
      const user = await User.findOne({ email: userEmail });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Create a new vehicle with the user's email
      const newVehicle = new Vehicle({
        make,
        model,
        year,
        userEmail: user.email,
      });
  
      await newVehicle.save();
      res.status(201).json(newVehicle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Update vehicle route
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { make, model, year, userEmail } = req.body;
  
    try {
      // Find the vehicle by id
      const vehicle = await Vehicle.findById(id);
  
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
  
      // Update the vehicle's details
      vehicle.make = make;
      vehicle.model = model;
      vehicle.year = year;
  
      await vehicle.save();
      res.status(200).json(vehicle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  module.exports = router;