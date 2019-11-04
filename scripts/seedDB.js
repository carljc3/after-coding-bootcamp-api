// connect=("localhost:3030/USERID_DB")
const mongoose = require("mongoose");
const db = require("../models");

// This file seeds the database AKA empties the userDATA collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/reactUSERID_DB"

) .then(data=>console.log("connection to DB sucessful!"))
  .catch(err=>console.log("ERROR DB",err))

const userDATA = [
  {
    Bootcamp: string,
    Review: string,
    Rating: number,
    FavoriteArticle: "[]",
    FavoriteVideo: "[]",
    SavedJobs:"NULL",
  },
];

db.userDATA
  .remove({})
  .then(() => db.USERID_DB.collection.insert(userDATA))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });