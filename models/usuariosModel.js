const pool = require("./db");

module.exports = {
    iniciarSesion: async (usuario, password) => {
        const query = `
            SELECT * FROM usuarios
            WHERE usuario = $1 AND password = $2
        `;
        const { rows } = await pool.query(query, [usuario, password]);

        return rows[0] || null;
    }
};
