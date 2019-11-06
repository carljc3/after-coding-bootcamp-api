const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors")
const session = require('express-session');
require("dotenv").config();

// Require all models
const db = require("./models")

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
    origin:["https://carljc3.github.io","http://localhost:3030"],
    credentials:true
}))

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/USERID_DB";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Static directory
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));

// **API ROUTES HERE** //
require("./routes").apiRoutes(app);
require("./routes").authRoutes(app);

// Start the server
app.listen(PORT, function(){
    console.log("listening on http://localhost:" + PORT)
});
