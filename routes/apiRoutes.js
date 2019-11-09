/**API AND DB ROUTES ONLY, WEB ROUTES ON OTHER REPO**/
const axios = require("axios");
require("dotenv").config();
const db = require('../models')

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.json("Welcome ACBC!");
  });

  app.get("/api/jobPostings", (req, res) => {
    axios
      .get(
        "https://authenticjobs.com/api/?api_key=" +
        process.env.AUTHENTIC_JOBS +
        "&method=aj.jobs.search&keywords=php,mysql&format=json"
      )
      .then(response => {
        console.log(response.data);
        res.send(response.data);
      });
  });

  app.get("/api/YouTubeVIDEOS", (req, res) => {
    axios
      .get(
        "https://www.googleapis.com/youtube/v3/search?key=" + process.env.YOUTUBE_SECRET_KEY + "&part=snippet&q=coding+bootcamp+grads"
      )
      .then(response => {
        console.log(response.data);
        res.send(response.data);
      })
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  });
  app.post("/api/portfolio/videos", (req, res) => {
    db.User.update({
      _id: req.session.user.id
    }, {
      $push: { favoriteVideos: req.body.newVideo }
    }).then(response => res.json(response))
  })

  app.post("/api/portfolio/jobs", (req, res) => {
    console.log(req.body)
    db.User.update({
      _id: req.session.user.id
    }, {
      $push: { savedJobs: req.body.newJob }
    }).then(response => res.json(response))
  })
};