const dotenv = require('dotenv');

// Carga las variables de entorno desde un archivo .env
dotenv.config();

// default app configuration
const port = process.env.PORT || 4000;
let db = process.env.MONGODB_URI || "mongodb://localhost:27017/nodegoat";

module.exports = {
    port,
    db,
    cookieSecret: process.env.COOKIE_SECRET || "default_session_cookie_secret", // ¡Establece una variable de entorno!
    cryptoKey: process.env.CRYPTO_KEY || "default_crypto_key", // ¡Establece una variable de entorno!
    cryptoAlgo: "aes256",
    hostName: "localhost",
    environmentalScripts: []
};
