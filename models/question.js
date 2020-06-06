'use strict';
module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define('question', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    question: {
      type: DataTypes.STRING
    },
    answer1: {
      type: DataTypes.STRING
    },
    answer2: {
      type: DataTypes.STRING
    },
    answer3: {
      type: DataTypes.STRING
    },
    answer4: {
      type: DataTypes.STRING
    },
    correctAnswer: {
      type: DataTypes.INTEGER
    }
  }, {});
  question.associate = function(models) {
    question.belongsTo(models.quiz);
  };
  return question;
};