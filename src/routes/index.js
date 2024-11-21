const cors = require("cors");
const express = require("express");
const emocao_routes = require("./emocao_routes.js");
const usuarios_sentimentos_routes = require("./usuarios_sentimentos_routes.js");

module.exports = (app) => {
    // Configuração do CORS
    app.use(cors({
        origin: 'http://localhost:3000', // Porta do frontend
        credentials: true, // Permitir envio de cookies ou autenticação
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
        allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
    }));

    // Lidando com requisições OPTIONS
    app.options('*', cors());

    // Middleware para JSON
    app.use(express.json());

    // Rotas da aplicação
    app.use(emocao_routes);
    app.use(usuarios_sentimentos_routes);
};
