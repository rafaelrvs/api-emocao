const express  = require("express")
const app = express()
const sequelize = require('./config/config.js')


const routes = require("./routes/index.js")
routes(app)


sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco estabelecida com sucesso');
    })
    .catch((err) => {
        console.error('Não foi possível se conectar com o banco', err);
    });



module.exports = app
