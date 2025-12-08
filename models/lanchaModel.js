const pool = require('./db');

module.exports = {
    // Obtener todas las lanchas
    obtenerLanchas: async () => {
        const query = "SELECT * FROM lanchas ORDER BY nombre ASC";
        const { rows } = await pool.query(query);
        return rows;
    },

    // Obtener una lancha por ID
    obtenerPorId: async (id) => {
        const query = "SELECT * FROM lanchas WHERE id = $1";
        const { rows } = await pool.query(query, [id]);
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

    // Actualizar lancha por ID
    actualizarLancha: async (id, datos) => {
        const query = `
            UPDATE lanchas
            SET nombre = $1,
                matricula = $2,
                lanchero = $3,
                capacidad = $4,
                foto = $5
            WHERE id = $6
            RETURNING *
        `;
        const values = [
            datos.nombre,
            datos.matricula,
            datos.lanchero,
            datos.capacidad,
            datos.foto || null,
            id
        ];

        const { rows } = await pool.query(query, values);
        return rows[0] || null;
    },

    // Eliminar lancha por ID
    eliminarLancha: async (id) => {
        const query = "DELETE FROM lanchas WHERE id = $1 RETURNING *";
        const { rows } = await pool.query(query, [id]);
        return rows[0] || null;
    }
};

