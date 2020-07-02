var express = require('express');
var router = express.Router();
var models = require('../models');
const sequelize = require('../models').sequelize;

// GET for the quips on the Home page
router.get('/', function(req, res, next) {
    models.quip
      .findOne({ order: [sequelize.fn( 'RAND' )]} )
      .then(randomQuip => {
        res.json(randomQuip);
      });
  });

  console.log(this.randomQuip);

module.exports = router;