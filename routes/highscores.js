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
router.put("/highscores/:id", authorization.needed('ADMIN'), function (req, res, next) {
    let highscoreId = parseInt(req.params.id);
    models.highscores
      .update(req.body, { where: { highscore_id: highscoreId } })
      .then(result => res.redirect('/highscores/' + highscoreId))
      .catch(err => {
        res.status(400);
        res.send("There was a problem updating the highscore.");
      });
  });
  

module.exports = router;

