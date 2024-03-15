const express = require("express");
const cors = require("cors");

const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

connectDB();


app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})