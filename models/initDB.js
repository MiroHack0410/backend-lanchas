const pool = require("./db");

const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS lanchas (
                nombre VARCHAR(100) NOT NULL,
                matricula VARCHAR(50) NOT NULL,
                lanchero VARCHAR(100) NOT NULL,
                capacidad INTEGER NOT NULL
            );
        `);

        console.log("✅ Tabla 'lanchas' creada o ya existente.");

        // Insertar ejemplo SOLO si está vacía
        const result = await pool.query("SELECT COUNT(*) FROM lanchas");
        if (result.rows[0].count === "0") {
            await pool.query(`
                INSERT INTO lanchas (nombre, matricula, lanchero, capacidad)
                VALUES 
                ('Lancha Tiburón', 'MX-1234', 'Juan Pérez', 10),
                ('Lancha El Rayo', 'MX-5678', 'Carlos Ramírez', 8);
            `);

            console.log("🌱 Ejemplos insertados en la tabla.");
        }

    } catch (err) {
        console.error("❌ Error al crear la tabla:", err);
    }
};

initDB();

module.exports = initDB;
