const jwt = require('jsonwebtoken');
const models = require('../models/index');

var authService = {
  signUser: function(user) {
    const token = jwt.sign(
      {
        userName: user.userName,
        id: user.id
      },
      'mik3sKey',
      {
        expiresIn: '1h'
      }
    );
    return token;
  },
  verifyUserForProfile: function (token) {  
    try {
      let decoded = jwt.verify(token, 'mik3sKey'); 
      return models.user.findByPk(decoded.id); 
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  verifyUserForHighscorePutRoute: function (token) {  
    try {
      let decoded = jwt.verify(token, 'mik3sKey'); 
      return models.hoghscore.findByPk(decoded.id); 
    } catch (err) {
      console.log(err);
      return null;
    }
  }

}

module.exports = authService;