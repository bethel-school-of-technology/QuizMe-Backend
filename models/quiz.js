'use strict';
module.exports = (sequelize, DataTypes) => {
  const quiz = sequelize.define('quiz', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    }
  }, {});
  quiz.associate = function(models) {
    // associations can be defined here
  };
  return quiz;
};