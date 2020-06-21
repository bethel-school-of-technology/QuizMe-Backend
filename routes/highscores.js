var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');

// POST new highscore after quiz
router.post('/', function (req, res, next) {
    models.highscores.create(req.body)
      .then(newHighscore => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(newHighscore));
      })
      .catch(err => {
        res.status(400);
        res.send(err.message);
      });
  });

// GET for the highscores page
router.get('/', function(req, res, next) {
    models.highscores
      .findAll()
      .then(highscoresFound => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(highscoresFound));
      });
  });

// PUT route for admins (needs security)
router.put("/:id", function (req, res, next) {
    let highscoreId = parseInt(req.params.id);
    models.highscores
      .update(req.body, { where: { id: highscoreId } })
      .then(result => res.redirect('/'))
      .catch(err => {
        res.status(400);
        res.send("There was a problem updating the highscore.");
      })
  });
  

module.exports = router;

