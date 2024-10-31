'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario_sentimento extends Model {
 
    static associate(models) {
    Usuario_sentimento.belongsTo(models.Sentimento,{
      foreignKey:"sentimento_id",
      as:"usuario_sentimentos"
    })
    }
  }
  Usuario_sentimento.init({
    sentimento_id: DataTypes.UUID,
    data_criacao: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Usuario_sentimento',
    tableName:'usuario_sentimentos'
  });
  return Usuario_sentimento;
};