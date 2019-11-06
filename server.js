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
    origin:["https://carljc3.github.io","http://localhost:3000"],
    credentials:true
}))

// Connect to the Mongo DB

mongoose.connect("mongodb://localhost/USERID_DB", { useNewUrlParser: true })
.then(data=>console.log("connection to DB sucessful!"))
  .catch(err=>console.log("ERROR DB",err))

const userDATA = {
  //DUMMY DATA (DO NOT ERASE)//
    username: "J-Anne",
    password: "password",
    bootcamp: "University of Washington",
    review: "Overwhelming amount of information.",
    rating: 4.5,
    favoriteVideos: [],
    favoriteArticles: [],
    savedJobs: [],

}

// db.User.create(userDATA)
//   .then(data => {
//     console.log(data.result + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });


// Static directory
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));

// **API ROUTES HERE** //
require("./routes").apiRoutes(app);
require("./routes").authRoutes(app);

// Start the server
app.listen(PORT, function(){
    console.log("listening on http://localhost:" + PORT)
});
