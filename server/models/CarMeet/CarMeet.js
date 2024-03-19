const mongoose = require("mongoose");

const carMeetSchema = new mongoose.Schema({
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  maxAttendees: Number,
});

const CarMeet = mongoose.model("CarMeet", carMeetSchema);

module.exports = CarMeet;
