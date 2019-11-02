const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config();

const PORT = process.env.PORT || 3030

// Initialize Express
const app = express();

app.use(cors())

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/populate", { useNewUrlParser: true });

// Require all models
// const db = require("./models")

// **API ROUTES HERE** //
require("./routes").apiRoutes(app)

// Start the server
app.listen(PORT, function(){
    console.log("listening on http://localhost:" + PORT)
});
