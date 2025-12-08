const db = require('./db');

const usuariosModel = {

    async iniciarSesion(usuario, password) {
        const [rows] = await db.query(
            "SELECT * FROM usuarios WHERE usuario = ? AND password = ?",
            [usuario, password]
        );

        return rows[0] || null; // Devuelve el usuario si existe
    },

    async crearUsuario(usuario, password) {
        const [result] = await db.query(
            "INSERT INTO usuarios (usuario, password) VALUES (?, ?)",
            [usuario, password]
        );

        return {
            id: result.insertId,
            usuario,
            password
        };
    }

};

module.exports = usuariosModel;
