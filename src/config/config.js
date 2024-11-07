require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_DB,          // Nome do banco de dados
  process.env.USER_DB,               // Nome do usuário
  process.env.PASSWORD_DB,           // Senha do usuário
  {
    host: process.env.HOST_DB,       // Host do banco de dados
    port: process.env.PORT_DB,       // Porta do banco de dados
    dialect: process.env.DIALECT_DB  // Dialeto do banco de dados
  }
);

module.exports = sequelize;
