const pool = require("./models/db");

async function initDB() {
    const createTable = `
        CREATE TABLE IF NOT EXISTS lanchas (
            nombre TEXT NOT NULL,
            matricula TEXT NOT NULL,
            lanchero TEXT NOT NULL,
            capacidad INTEGER NOT NULL
        );
    `;

    const insertExamples = `
        INSERT INTO lanchas (nombre, matricula, lanchero, capacidad)
        VALUES
        ('La Sirenita', 'MX-001', 'Don Miguel', 8),
        ('El Delfín Azul', 'MX-002', 'Pedro Sánchez', 10),
        ('Amanecer', 'MX-003', 'Juan López', 6)
    `;
    
    try {
        await pool.query(createTable);
        console.log("✔ Tabla creada correctamente");

        await pool.query(insertExamples);
        console.log("✔ Datos de ejemplo insertados");

        process.exit(0);
    } catch (err) {
        console.error("❌ Error al crear la BD:", err);
        process.exit(1);
    }
}

initDB();
