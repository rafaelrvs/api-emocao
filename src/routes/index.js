const cors = require("cors");
const express = require("express");
const emocao_routes = require("./emocao_routes.js");
const usuarios_sentimentos_routes = require("./usuarios_sentimentos_routes.js");

module.exports = (app) => {
    const corsOptions = {
        origin: function (origin, callback) {
            const allowedOrigins = ["http://localhost:3000", "https://clima.amalfis.com.br"];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(emocao_routes);
    app.use(usuarios_sentimentos_routes);
};
