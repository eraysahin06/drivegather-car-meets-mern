const express = require("express");
const cors = require("cors");
const Vehicle = require('./models/Vehicle/Vehicle');
const connectDB = require('./db');
const User = require("./models/User/User");
const Community = require("./models/Community/Community");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

connectDB();

// Get user by ID route
app.get('/users/id/:userId', async (req, res) => {
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
app.get('/users/:email', async (req, res) => {
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
app.post('/users', async (req, res) => {
    const { firebaseId, displayName, email, username, photoURL } = req.body;
    try {
        let user = await User.findOneAndUpdate({ firebaseId }, { displayName, email, username, photoURL }, { new: true, upsert: true });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Update user route
app.put('/users/:email', async (req, res) => {
    const { email } = req.params;
    const { username } = req.body;

    try {
        const user = await User.findOneAndUpdate({ email }, { username }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        console.error('Server error:', error); // Log the error
        res.status(400).json({ message: error.message });
    }
});

// Get a specific community by ID
app.get('/communities/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const community = await Community.findById(id);

        if (!community) {
            return res.status(404).json({ message: "Community not found" });
        }

        res.status(200).json(community);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: error.message });
    }
});


// Get user's vehicles route
app.get('/vehicles', async (req, res) => {
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
app.post('/vehicles', async (req, res) => {
    const { make, model, year, userEmail } = req.body;
    
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
            userEmail: user.email
        });

        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update vehicle route
app.put('/vehicles/:id', async (req, res) => {
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

// Create community route
app.post('/communities', async (req, res) => {
    const { creatorId, creatorUsername, name, type } = req.body;
    try {
        const newCommunity = new Community({
            creatorId,
            creatorUsername,
            name,
            type,
            members: [creatorId], // Include the creator's ID in the members array
            memberCount: 1 // Set the initial member count to 1
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
app.get('/communities', async (req, res) => {
    try {
        const communities = await Community.find();
        res.status(200).json(communities);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: error.message });
    }
});


app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
