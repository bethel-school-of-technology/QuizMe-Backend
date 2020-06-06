var express = require('express');
var router = express.Router();

/* GET all users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET one user listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
