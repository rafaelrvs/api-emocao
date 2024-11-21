const cors = require("cors");
const express = require("express");
const emocao_routes = require("./emocao_routes.js");
const usuarios_sentimentos_routes = require("./usuarios_sentimentos_routes.js");

module.exports = (app) => {
    app.use(cors({
        origin: 'http://localhost:3000', // ou a porta que seu frontend está rodando
    }));
    app.use(express.json());
    app.use(emocao_routes);
    app.use(usuarios_sentimentos_routes);
};
