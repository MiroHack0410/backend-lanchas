const { Pool } = require('pg');
require('dotenv').config();

// Conexión a PostgreSQL con variables de Render
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function initDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS lanchas (
                matricula VARCHAR(50) PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                lanchero VARCHAR(100) NOT NULL,
                capacidad INTEGER NOT NULL,
                foto TEXT
            );
        `);

        console.log("✅ Tabla 'lanchas' creada o ya existente.");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error al crear la tabla:", err);
        process.exit(1);
    }
}

initDB();
