// connect=("localhost:3030/USERID_DB")
const mongoose = require("mongoose");
const db = require("../models");

// This file seeds the database AKA empties the userDATA collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/USERID_DB"

) .then(data=>console.log("connection to DB sucessful!"))
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

db.User
  .remove({})
  .then(() => db.User.create(userDATA))
  .then(data => {
    console.log(data.result + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });