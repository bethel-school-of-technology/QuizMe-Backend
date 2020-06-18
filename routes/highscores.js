var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');

router.post('/highscore', function (req, res, next) {
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


router.get('/highscores/all', function(req, res, next) {
    models.highscores
      .findAll()
      .then(highscoresFound => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(highscoresFound));
      });
  });


module.exports = router;