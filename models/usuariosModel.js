const pool = require("./db");

// 🔹 INICIAR SESIÓN
async function iniciarSesion(usuario, password) {
    const query = `
        SELECT * FROM usuarios
        WHERE usuario = $1 AND password = $2
    `;
    const { rows } = await pool.query(query, [usuario, password]);
    return rows[0] || null;
}

// 🔹 CREAR CUENTA
async function crearCuenta(usuario, password) {
    const query = `
        INSERT INTO usuarios (usuario, password)
        VALUES ($1, $2)
        RETURNING *
    `;
    const { rows } = await pool.query(query, [usuario, password]);
    return rows[0];
}

module.exports = {
    iniciarSesion,
    crearCuenta
};
