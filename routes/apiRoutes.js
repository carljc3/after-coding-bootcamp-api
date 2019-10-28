const db = require("../models")

module.exports = function (app) {
    app.get("/", function(req, res){
        res.json("Welcome ACBC!")
    })
}

// /**API ROUTES TEMPLATE**/
// const axios = require("axios");
// const router = require("express").Router();

// router.get("/__NAMEHERE__", (req, res) => {
//   axios
//     .get("___URL_ROUTE__HERE___", { params: req.query })
//     .then(({ data: { results } }) => res.json(results))
//     .catch(err => res.status(422).json(err));
// });

// module.exports = router;