const pool = require("./db");

module.exports = {

    // 🔹 Iniciar sesión
    iniciarSesion: async (usuario, password) => {
        const query = `
            SELECT * FROM usuarios
            WHERE usuario = $1 AND password = $2
        `;
        const { rows } = await pool.query(query, [usuario, password]);
        return rows[0] || null;
    },

    // 🔹 Crear cuenta (para CrearCuentaActivity)
    crearCuenta: async (nombre, matricula, lanchero, capacidad) => {
        const query = `
            INSERT INTO usuarios (nombre, matricula, lanchero, capacidad)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

        const { rows } = await pool.query(query, [
            nombre,
            matricula,
            lanchero,
            capacidad
        ]);

        return rows[0]; // retorna el usuario creado
    }
};
