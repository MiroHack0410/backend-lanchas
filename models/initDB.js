const pool = require("./db");

const initDB = async () => {
    try {
        // Crear tabla usuarios si no existe
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                usuario VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);
        console.log("✅ Tabla 'usuarios' lista.");

        // Insertar usuario admin si no existe
        await pool.query(`
            INSERT INTO usuarios (usuario, password)
            VALUES ('admin', '12345')
            ON CONFLICT (usuario) DO NOTHING;
        `);

        console.log("👤 Usuario admin agregado (o ya existía).");

    } catch (err) {
        console.error("❌ Error al inicializar la base de datos:", err);
    }
};

initDB();

module.exports = initDB;
