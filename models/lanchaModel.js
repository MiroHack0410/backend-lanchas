const pool = require("./db");

module.exports = {
    // Obtener todas las lanchas
    obtenerLanchas: async () => {
        const query = "SELECT * FROM lanchas";
        const { rows } = await pool.query(query);
        return rows;
    },

    // Crear lancha NUEVA (usando nombre como clave)
    crearLancha: async (lancha) => {
        const query = `
            INSERT INTO lanchas (nombre, matricula, lanchero, capacidad)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [
            lancha.nombre,
            lancha.matricula,
            lancha.lanchero,
            lancha.capacidad,
        ];

        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    // Actualizar lancha por nombre
    actualizarLancha: async (nombre, datos) => {
        const query = `
            UPDATE lanchas
            SET matricula = $1,
                lanchero = $2,
                capacidad = $3
            WHERE nombre = $4
            RETURNING *
        `;

        const values = [
            datos.matricula,
            datos.lanchero,
            datos.capacidad,
            nombre
        ];

        const { rows } = await pool.query(query, values);

        if (rows.length === 0) return null; // No existe

        return rows[0];
    }
};
