const cors = require("cors");
const express = require("express");
const emocao_routes = require("./emocao_routes.js");
const usuarios_sentimentos_routes = require("./usuarios_sentimentos_routes.js");

module.exports = (app) => {
    // Lista de origens permitidas
    const allowedOrigins = ['http://localhost:3000', 'https://clima.amalfis.com.br'];

    // Configuração dinâmica do CORS
    app.use(cors({
        origin: (origin, callback) => {
            // Permitir origens na lista ou requisições sem origem (como de ferramentas de teste)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Permitir cookies ou autenticação
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
        allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
    }));

    // Middleware para JSON
    app.use(express.json());

    // Rotas da aplicação
    app.use(emocao_routes);
    app.use(usuarios_sentimentos_routes);
};
