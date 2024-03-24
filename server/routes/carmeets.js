const express = require("express");
const router = express.Router();
const CarMeet = require("../models/CarMeet/CarMeet");
const Community = require("../models/Community/Community");

// Create a Car Meet
router.post("/:communityId/car-meets", async (req, res) => {
  const { communityId } = req.params;
  const { creatorId, name, description, location, date, maxAttendees } =
    req.body;

  try {
    // Check if the creator is the community creator
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    if (community.creatorId.toString() !== creatorId) {
      return res
        .status(403)
        .json({ message: "Only the community creator can create a Car Meet" });
    }

    // Create a new Car Meet
    const newCarMeet = new CarMeet({
      communityId,
      creatorId,
      name,
      description,
      location,
      date,
      attendees: [],
      maxAttendees,
    });

    await newCarMeet.save();

    res.status(201).json(newCarMeet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all Car Meets for a community
router.get("/:communityId/car-meets", async (req, res) => {
  const { communityId } = req.params;

  try {
    const carMeets = await CarMeet.find({ communityId });
    res.status(200).json(carMeets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a Car Meet
router.put("/:communityId/car-meets/:carMeetId", async (req, res) => {
  const { communityId, carMeetId } = req.params;
  const { creatorId, name, description, location, date, maxAttendees } = req.body;

  try {
    const carMeet = await CarMeet.findById(carMeetId);

    if (!carMeet) {
      return res.status(404).json({ message: "Car Meet not found" });
    }

    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (community.creatorId.toString() !== creatorId) {
      return res
        .status(403)
        .json({ message: "Only the community creator can update a Car Meet" });
    }

    await CarMeet.findByIdAndUpdate(carMeetId, {
      name,
      description,
      location,
      date,
      maxAttendees,
    });

    res.status(200).json({ message: "Car Meet updated successfully" });
  } catch (error) {
    console.error("Error updating car meet:", error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a Car Meet
router.delete("/:communityId/car-meets/:carMeetId", async (req, res) => {
  const { communityId, carMeetId } = req.params;

  try {
    const carMeet = await CarMeet.findById(carMeetId);

    if (!carMeet) {
      return res.status(404).json({ message: "Car Meet not found" });
    }

    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

  

    await CarMeet.findByIdAndDelete(carMeetId);

    res.status(200).json({ message: "Car Meet deleted successfully" });
  } catch (error) {
    console.error("Error deleting car meet:", error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
