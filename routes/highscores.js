var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');
var authService = require('../services/auth');

// POST new highscore after quiz
router.post('/', function (req, res, next) {
    models.highscores.create({...req.body, category: (req.body.category ? req.body.category : 0)})
      .then(newHighscore => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(newHighscore));
      })
      .catch(err => {
        res.status(400);
        console.log(err.message)
        res.send(err.message);
      });
  });

// GET for the highscores page
router.get('/', function(req, res, next) {
  models.highscores
    .findAll({ order: [["highscore", "DESC"]], limit: 5 } )
    .then(highscoresFound => {
      res.json(highscoresFound);
    });
});

router.get('/:category', function(req, res, next) {
  models.highscores
    .findAll({where: {category: parseInt(req.params.category)}})
    .then(highscoresFound => {
      res.json(highscoresFound);
    });
});

// secured put route for admins
router.put("/:id", function (req, res, next) {
  let highscore_id = parseInt(req.params.id);
  if (req.cookies.jwt) {
    authService.verifyUser(req.cookies.jwt)
      .then(       
        models.highscores
          .update(req.body, { where: { id: highscore_id } })
          .then(result => {res.json(req.body)})
          .catch(err => {
            res.status(400);
            res.send("There was a problem updating the highscore.");
          })
      );
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});
  

module.exports = router;

