var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();

var PORT = 4000;

// Require all models
// var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/populate", { useNewUrlParser: true });

app.get("/api/jobPostings", (req, res)=>{
    axios
    .get("https://authenticjobs.com/api/?api_key=" + process.env.AUTHENTIC_JOBS + "&method=aj.jobs.search&keywords=php,mysql&format=json")
    .then(response =>{
        console.log(response.data)
        res.send(response.data);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});