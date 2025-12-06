const pool = require("./db");

module.exports = {
    // Obtener todas las lanchas
    obtenerLanchas: async () => {
        const query = "SELECT * FROM lanchas ORDER BY nombre ASC";
        const { rows } = await pool.query(query);
        return rows;
    },

    // Obtener una lancha por nombre
    obtenerPorNombre: async (nombre) => {
        const query = "SELECT * FROM lanchas WHERE nombre = $1";
        const { rows } = await pool.query(query, [nombre]);
        return rows[0] || null;
    },

    // Crear lancha NUEVA
    crearLancha: async (lancha) => {
        const query = `
            INSERT INTO lanchas (nombre, matricula, lanchero, capacidad, foto)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [
            lancha.nombre,
            lancha.matricula,
            lancha.lanchero,
            lancha.capacidad,
            lancha.foto || null
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
                capacidad = $3,
                foto = $4
            WHERE nombre = $5
            RETURNING *
        `;

        const values = [
            datos.matricula,
            datos.lanchero,
            datos.capacidad,
            datos.foto || null,
            nombre
        ];

        const { rows } = await pool.query(query, values);
        return rows[0] || null;
    }
};
