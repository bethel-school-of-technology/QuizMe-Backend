var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');


// give authorized access to highscore editing
router.put("/:id", function (req, res, next) {
  let highscore_id = parseInt(req.params.id);
  let token = req.cookies.jwt;

  if (token) {
    authService.verifyUserForHighscorePutRoute(token)
      .then(
        hs => {
          if (hs) {
            models.highscores
            .update(req.body, { where: { id: highscore_id } })
            .then(result => res.redirect('/'))
            .catch(err => {
              res.status(400);
              res.send("There was a problem updating the highscore.");
            })} else {
            res.status(401);
            res.send('Invalid authentication token');
          }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});


module.exports = router;

