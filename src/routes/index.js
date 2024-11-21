const cors = require("cors");
const express = require("express");
const emocao_routes = require("./emocao_routes.js");
const usuarios_sentimentos_routes = require("./usuarios_sentimentos_routes.js");

module.exports = (app) => {
    // Configuração do CORS com opções
    const corsOptions = {
        origin: ["http://localhost:3000", "https://clima.amalfis.com.br"], // Adicione todas as origens permitidas
        methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
        allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
        credentials: true, // Permite envio de cookies e credenciais
    };

    // Middleware do CORS
    app.use(cors(corsOptions));

    // Middleware para parse do JSON
    app.use(express.json());

    // Rotas da aplicação
    app.use(emocao_routes);
    app.use(usuarios_sentimentos_routes);
};
