const db = require('./db');

const usuariosModel = {

    async iniciarSesion(usuario, password) {
        try {
            const result = await db.query(
                "SELECT * FROM usuarios WHERE usuario = $1 AND password = $2",
                [usuario, password]
            );

            // result.rows es el arreglo correcto en PostgreSQL
            return result.rows[0] || null;

        } catch (err) {
            console.error("🔥 Error en iniciarSesion:", err);
            throw err;
        }
    }

};

module.exports = usuariosModel;
