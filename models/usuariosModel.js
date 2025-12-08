const db = require('./db.js');

const usuariosModel = {
    async iniciarSesion(usuario, password) {
        try {
            const query = `
                SELECT *
                FROM usuarios
                WHERE usuario = $1 AND password = $2
            `;

            const values = [usuario, password];
            const result = await db.query(query, values);

            return result.rows[0] || null;

        } catch (error) {
            console.error("Error en iniciarSesion:", error);
            throw error;
        }
    }
};

module.exports = usuariosModel;
