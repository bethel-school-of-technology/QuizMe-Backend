'use strict';
module.exports = (sequelize, DataTypes) => {
  const highscores = sequelize.define('highscores', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    category: {
      type: DataTypes.INTEGER
    },
    playername: {
      type: DataTypes.STRING
    },
    highscore: {
        type: DataTypes.INTEGER
    }
  }, {});
  highscores.associate = function(models) {
    // associations can be defined here
  };
  return highscores;
};