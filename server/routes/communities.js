const express = require("express");
const router = express.Router();
const Community = require("../models/Community/Community");
const User = require("../models/User/User");

// Get a specific community by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const community = await Community.findById(id);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    res.status(200).json(community);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Create community route
router.post("/", async (req, res) => {
  const { creatorId, creatorUsername, name, type } = req.body;
  try {
    const newCommunity = new Community({
      creatorId,
      creatorUsername,
      name,
      type,
      members: [creatorId], // Include the creator's ID in the members array
      memberCount: 1, // Set the initial member count to 1
    });

    // Save the new community
    await newCommunity.save();

    // Update the user's communities array
    await User.findByIdAndUpdate(
      creatorId,
      { $push: { communities: newCommunity._id } }, // Add the new community's ID to the user's communities array
      { new: true }
    );

    res.status(201).json(newCommunity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all communities route
router.get("/", async (req, res) => {
  try {
    const communities = await Community.find();
    res.status(200).json(communities);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Join community route
router.put("/:id/join", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const community = await Community.findById(id);
    const user = await User.findById(userId);

    if (!community || !user) {
      return res.status(404).json({ message: "Community or user not found" });
    }

    // Check if the user is already a member or pending member
    const isMember = community.members.includes(userId);
    const isPendingMember = community.pendingMembers.includes(userId);

    if (!isMember && !isPendingMember) {
      if (community.type === "Private") {
        community.pendingMembers.push(userId);
      } else {
        community.members.push(userId);
        community.memberCount += 1;
      }
      await community.save();
    }

    res.status(200).json(community);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Accept join request
router.put("/:id/accept", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const community = await Community.findById(id);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    // Move user from pendingMembers to members
    community.pendingMembers = community.pendingMembers.filter(
      (memberId) => memberId.toString() !== userId
    );
    community.members.push(userId);
    community.memberCount += 1;

    await community.save();
    res.status(200).json(community);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Decline join request
router.put("/:id/decline", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const community = await Community.findById(id);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    // Remove user from pendingMembers
    community.pendingMembers = community.pendingMembers.filter(
      (memberId) => memberId.toString() !== userId
    );

    await community.save();
    res.status(200).json(community);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Check if a user is a member of a specific community
router.get("/:id/isMember/:userId", async (req, res) => {
  const { id, userId } = req.params;
  try {
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    const isMember = community.members.some(
      (member) => member.toString() === userId
    );
    res.status(200).json({ isMember });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Leave a community
router.put("/:id/leave", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    // Remove the user from the members array
    community.members = community.members.filter(
      (member) => member.toString() !== userId
    );

    // Update the member count
    community.memberCount = community.members.length;

    await community.save();

    res.status(200).json({ message: "You have left the community" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
