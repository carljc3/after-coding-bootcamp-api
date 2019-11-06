/**API AND DB ROUTES ONLY, WEB ROUTES ON OTHER REPO**/
require('dotenv').config()

const db = require("../models")

module.exports = function (app) {
    app.get("/", function(req, res){
        res.json("Welcome ACBC!")
    })
}

app.get("/api/jobPostings", (req, res)=>{
    axios
    .get("https://authenticjobs.com/api/?api_key=" + process.env.AUTHENTIC_JOBS + "&method=aj.jobs.search&keywords=php,mysql&format=json")
    .then(response =>{
        console.log(response.data)
        res.send(response.data);
    });
});

app.get("/YoutubeVideos", (req, res) => {
    axios
    .get("https://www.googleapis.com/youtube/v3/search", 
    { params: req.query, part: "snippet", q:"coding bootcamp",  
    key: process.env.YOUTUBE_SECRET_KEY })
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});

module.exports = router;