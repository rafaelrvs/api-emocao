const cors = require("cors");
const express = require("express");
const emocao_routes = require("./emocao_routes.js");
const usuarios_sentimentos_routes = require("./usuarios_sentimentos_routes.js");

module.exports = (app) => {
    // Lista de origens permitidas
    const allowedOrigins = ['http://localhost:3000', 'https://clima.amalfis.com.br'];

    // Configuração do CORS
    app.use((req, res, next) => {
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
        }
        next();
    });

    // Middleware para JSON
    app.use(express.json());

    // Rotas da aplicação
    app.use(emocao_routes);
    app.use(usuarios_sentimentos_routes);
};
