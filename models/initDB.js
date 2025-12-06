const pool = require("./db");

const initDB = async () => {
    try {
        // Crear tabla si no existe
        await pool.query(`
            CREATE TABLE IF NOT EXISTS lanchas (
                nombre VARCHAR(100) PRIMARY KEY,
                matricula VARCHAR(50),
                lanchero VARCHAR(100),
                capacidad INTEGER
            );
        `);

        // Agregar columna foto si no existe
        await pool.query(`
            ALTER TABLE lanchas 
            ADD COLUMN IF NOT EXISTS foto TEXT;
        `);

        console.log("✅ Tabla 'lanchas' lista con la columna 'foto'.");

        // Insertar ejemplo SOLO si está vacía
        const result = await pool.query("SELECT COUNT(*) FROM lanchas");

        if (result.rows[0].count === "0") {
            await pool.query(`
                INSERT INTO lanchas (nombre, matricula, lanchero, capacidad, foto)
                VALUES 
                ('Lancha Tiburón', 'MX-1234', 'Juan Pérez', 10, 'https://example.com/tiburon.jpg'),
                ('Lancha El Rayo', 'MX-5678', 'Carlos Ramírez', 8, 'https://example.com/rayo.jpg');
            `);

            console.log("🌱 Ejemplos insertados en la tabla.");
        }

    } catch (err) {
        console.error("❌ Error al inicializar la base de datos:", err);
    }
};

initDB();

module.exports = initDB;

