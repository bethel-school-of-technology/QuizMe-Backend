var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');

// /* GET all users listing. */
// router.get('/', function(req, res, next) {
//   models.users.findAll().then(users =>{
//   res.json(users)
//   })
// });

// /* GET one user listing. */
// router.get('/users:id', function(req, res, next) {
//   models.users.findByPk(parseInt(req.params.id)).then(user =>{
//     res.json(user)
//   })
// });

// /* Create user */
// router.post('/user', function(req, res, next) {
//   models.post.create(req.body).then(() => {
//   res.json({message: 'Created user!'})
    
//   });
// });

// Create new user if one doesn't exist
router.post('/signup', function(req, res, next) {
  models.user
    .findOrCreate({
      where: {
        userName: req.body.userName
      },
      defaults: {
        password: req.body.password
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});

// Login user and return JWT as cookie
router.post('/login', function (req, res, next) {
  models.user.findOne({
    where: {
      userName: req.body.userName,
      password: req.body.password
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed, sad day..."
      });
    }
    if (user) {
      let token = authService.signUser(user); 
      res.cookie('jwt', token); 
      res.send('Login successful, you must be an administrator!');
    } else {
      console.log('Wrong password, are you a hacker?!');
      res.redirect('login')
    }
  });
});

// give authenticated access to user profile
router.get('/profile', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.send(JSON.stringify(user));
        } else {
          res.status(401);
          res.send('Invalid authentication token');
        }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});

// logout user and set JWT cookie to null
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
  });

module.exports = router;
