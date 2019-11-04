/**API AND DB ROUTES ONLY, WEB ROUTES ON OTHER REPO**/
const axios = require("axios");
const bcrypt = require("bcrypt");
const db = require("../models");
require("dotenv").config();

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.json("Welcome to ACBC!");
  });

  app.post("/signup", function(req, res) {
      console.log("signup");
      console.log(req.body);
      db.User.create({
          email: req.body.email,
          username: req.body.username,
          password: req.body.password
      }).then(newUser=>res.json(newUser));
  });

  app.post("/login", function(req, res) {
      console.log("login");
      console.log(req.body);
      db.User.findOne({
          where: {
              username: req.body.username
          }
      })
      .then(function (dbUser) {
        if (!dbUser) {
            res.status(500).send("no such user")
        }
        else {
            //compares password send in req.body to one in database, will return true if matched.
            if (bcrypt.compareSync(req.body.password, dbUser.password)) {
                //create new session property "user", set equal to logged in user
                req.session.user = { id: dbUser.id, name: dbUser.name }
                req.session.error = null;
                res.status(200).json(req.session);
            }
            else {
                //delete existing user, add error
                req.session.user = false;
                req.session.error = 'auth failed bro';
                res.status(401).send("password incorrect");
            }
        }
    })
});
  
  app.get("/logout", function (req, res) {
      req.session.destroy(function () {
          res.send('successfully logged out')
      });
  })
};