const express = require("express");
const cors = require("cors");
const Vehicle = require('./models/Vehicle/Vehicle'); // Import Vehicle model
const connectDB = require('./db');
const User = require("./models/User/User");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

connectDB();

// Add user route
app.post('/users', async (req, res) => {
    const { firebaseId, displayName, email, photoURL } = req.body;
    try {
        let user = await User.findOneAndUpdate({ firebaseId }, { displayName, email, photoURL }, { new: true, upsert: true });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
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



app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
