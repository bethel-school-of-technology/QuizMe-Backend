var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');

router.put("/:id", function (req, res, next) {
  let token = req.cookies.jwt;
  let highscoreId = parseInt(req.params.id);
  if (token) {
    authService.verifyUser(token)
      .then(models.highscores
    .update(req.body, { where: { highscore_id: highscoreId } })
    .then(result => res.redirect('/highscores/' + highscoreId))
    .catch(err => {
      res.status(400);
      res.send("There was a problem updating the highscore.");
    }));
  } else {
    res.status(401);
    res.send('Must be logged in as an Administrator.');
  };

  // let highscoreId = parseInt(req.params.id);
  // models.highscores
  //   .update(req.body, { where: { highscore_id: highscoreId } })
  //   .then(result => res.redirect('/highscores/' + highscoreId))
  //   .catch(err => {
  //     res.status(400);
  //     res.send("There was a problem updating the highscore.");
  //   });
  });
  

module.exports = router;

