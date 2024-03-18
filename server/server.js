const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const userRoutes = require("./routes/users");
const communityRoutes = require("./routes/communities");
const vehicleRoutes = require("./routes/vehicles");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

connectDB();


// Use routes
app.use("/users", userRoutes);
app.use("/communities", communityRoutes);
app.use("/vehicles", vehicleRoutes);






app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
