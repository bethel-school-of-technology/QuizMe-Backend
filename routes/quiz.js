var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('./models');

/* GET home page. */
// router.get('/quiz/categoryid', function(req, res, next) {
//   res.render('quiz', { title: 'Express' });
// });

router.get('/quiz/:id', function(req, res, next) {
    models.quiz
      .findByPk(parseInt(req.params.id), { 
        include: [{ model: models.question }]
      })
      .then(questionsFound => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(questionsFound));
      })
  });

module.exports = router;