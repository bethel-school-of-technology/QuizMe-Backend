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
      .findAll({
        order: [['highscore', 'DESC']] 
      })
      .then(highscoresFound => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(highscoresFound));
      });
    models.highscores
      .findAll()
      .then(highscoresFound => {
        res.setHeader('Content-Type', 'application/json');
        res.JSON(highscoresFound);
      });
    // res.json([
    //   {
    //     id: 1,
    //     category: 15,
    //     playername: "SeanMXD",
    //     highscore: 1200
    //   },
    //   {
    //     id: 1,
    //     category: 15,
    //     playername: "SeanMXD",
    //     highscore: 1200
    //   },
    //   {
    //     id: 1,
    //     category: 15,
    //     playername: "SeanMXD",
    //     highscore: 1200
    //   },
    //   {
    //     id: 1,
    //     category: 16,
    //     playername: "SeanMXD",
    //     highscore: 1200
    //   },
    //   {
    //     id: 1,
    //     category: 16,
    //     playername: "SeanMXD",
    //     highscore: 1200
    //   },
    //   {
    //     id: 1,
    //     category: 16,
    //     playername: "SeanMXD",
    //     highscore: 1200
    //   }
    // ])
});

  // GET for the highscores page
router.get('/:id', function(req, res, next) {
  models.highscores
    .findAll()
    .then(highscoresFound => {
      res.setHeader('Content-Type', 'application/json');
      res.JSON(highscoresFound);
    });
  // res.json([
  //   {
  //     id: 1,
  //     category: req.params.id,
  //     playername: "SeanMXD",
  //     highscore: 1200
  //   },
  //   {
  //     id: 1,
  //     category: req.params.id,
  //     playername: "SeanMXD",
  //     highscore: 1200
  //   },
  //   {
  //     id: 1,
  //     category: req.params.id,
  //     playername: "SeanMXD",
  //     highscore: 1200
  //   }
  // ])
});

// secured put route for admins
router.put("/:id", function (req, res, next) {
  let highscore_id = parseInt(req.params.id);
  let token = req.cookies.jwt;

  if (token) {
    authService.verifyUser(token)
      .then(       
        models.highscores
          .update(req.body, { where: { id: highscore_id } })
          .then(result => res.redirect('/'))
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

