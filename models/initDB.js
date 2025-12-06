const pool = require("./db");

const initDB = async () => {
    try {
        // Eliminar tabla existente si existe
        await pool.query(`DROP TABLE IF EXISTS lanchas;`);
        console.log("🗑 Tabla 'lanchas' eliminada si existía.");

        // Crear tabla nueva
        await pool.query(`
            CREATE TABLE lanchas (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(100),
                matricula VARCHAR(50),
                lanchero VARCHAR(100),
                capacidad INTEGER,
                foto TEXT
            );
        `);
        console.log("✅ Nueva tabla 'lanchas' creada con columna 'id'.");

        // Insertar ejemplos
        await pool.query(`
            INSERT INTO lanchas (nombre, matricula, lanchero, capacidad, foto)
            VALUES 
            ('Lancha Tiburón', 'MX-1234', 'Juan Pérez', 10, 'https://example.com/tiburon.jpg'),
            ('Lancha El Rayo', 'MX-5678', 'Carlos Ramírez', 8, 'https://example.com/rayo.jpg');
        `);
        console.log("🌱 Ejemplos insertados en la nueva tabla.");

    } catch (err) {
        console.error("❌ Error al inicializar la base de datos:", err);
    }
};

initDB();

module.exports = initDB;


