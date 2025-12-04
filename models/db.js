const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'basesanandres.com.mx', // tu host remoto
    user: process.env.DB_USER || 'basesan1_equipo5',      // tu usuario
    password: process.env.DB_PASSWORD || 'Equipo12345*',  // tu contraseña
    database: process.env.DB_NAME || 'basesan1_equipo5',  // tu base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;