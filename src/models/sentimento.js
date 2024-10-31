'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sentimento extends Model {
 
    static associate(models) {
      Sentimento.hasMany(models.Usuario_sentimento,{
        foreignKey:"sentimento_id",
        as:"sentimentos_dos_usuarios"
      })
      }
    
  }
  Sentimento.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sentimento',
    tableName:'sentimentos'
  });
  return Sentimento;
};