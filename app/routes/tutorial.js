const express = require("express");
const rateLimit = require("express-rate-limit"); // Implementación de Rate Limiter

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limitar IP cada 100 solicitudes por windowMs
    message: "Too many requests, please try again later."
});

const {
    environmentalScripts
} = require("../../config/config");

const router = express.Router();

// Implementar el limiter Middleware a todas las rutas
router.use(limiter);

router.get("/", (req, res) => {
    "use strict";
    return res.render("tutorial/a1", {
        environmentalScripts
    });
});

const pages = [
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "a8",
    "a9",
    "a10",
    "redos",
    "ssrf"
];

for(const page of pages) {
    router.get(`/${page}`, (req, res) => {
        "use strict";
        return res.render(`tutorial/${page}`, {
            environmentalScripts
        });
    });
}

module.exports = router;
