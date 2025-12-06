const pool = require("../models/db");

async function initDB() {
    console.log("🔵 initDB cargado");

    try {
        // Crear tabla
        await pool.query(`
            CREATE TABLE IF NOT EXISTS lanchas (
                id SERIAL PRIMARY KEY,
                nombre TEXT NOT NULL,
                matricula TEXT NOT NULL UNIQUE,
                lanchero TEXT NOT NULL,
                capacidad INTEGER NOT NULL,
                foto TEXT
            );
        `);

        console.log("✅ Tabla 'lanchas' creada o ya existente.");

        // Insertar datos de ejemplo si está vacía
        const { rows } = await pool.query("SELECT COUNT(*) FROM lanchas");
        const count = parseInt(rows[0].count);

        if (count === 0) {
            console.log("🟡 Insertando datos de ejemplo...");

            await pool.query(`
                INSERT INTO lanchas (nombre, matricula, lanchero, capacidad, foto)
                VALUES
                    ('Lancha Aurora', 'MAT001', 'Juan Pérez', 12, 'https://example.com/foto1.jpg'),
                    ('Lancha Veloz', 'MAT002', 'Carlos Ruiz', 8, 'https://example.com/foto2.jpg'),
                    ('Lancha Mar Azul', 'MAT003', 'Ana Morales', 15, 'https://example.com/foto3.jpg');
            `);

            console.log("✨ Datos de ejemplo insertados.");
        } else {
            console.log("ℹ Ya existen lanchas, no se agregaron ejemplos.");
        }

    } catch (err) {
        console.error("❌ Error al inicializar base de datos:", err);
    }
}

module.exports = initDB;
