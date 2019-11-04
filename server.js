const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors")
const session = require('express-session');
require("dotenv").config();

const PORT = process.env.PORT || 3030

// Initialize Express
const app = express();

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin:["https://carljc3.github.io","http://localhost:3000"],
    credentials:true
}))

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/populate", { useNewUrlParser: true });

// Static directory
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));

// Require all models
const db = require("./models")

// **API ROUTES HERE** //
require("./routes").apiRoutes(app);
require("./routes").authRoutes(app);

// Start the server
app.listen(PORT, function(){
    console.log("listening on http://localhost:" + PORT)
});
