var express = require('express');
var router = express.Router();

/* GET all users listing. */
router.get('/', function(req, res, next) {
  models.users.findAll().then(users =>{
  res.json(users)
  })
});

/* GET one user listing. */
router.get('/users:id', function(req, res, next) {
  models.users.findByPk(parseInt(req.params.id)).then(user =>{
    res.json(user)
  })
});

/* Create user */
router.post('/user', function(req, res, next) {
  models.post.create(req.body).then(() => {
  res.json({message: 'Created user!'})
    
  });
});

module.exports = router;
