const pool = require("./db");

class LanchaModel {
    static async obtenerLanchas() {
        const { rows } = await pool.query("SELECT * FROM lanchas");
        return rows;
    }

    static async crearLancha(data) {
        const { nombre, matricula, lanchero, capacidad } = data;

        const query = `
            INSERT INTO lanchas (nombre, matricula, lanchero, capacidad)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [nombre, matricula, lanchero, capacidad];

        const { rows } = await pool.query(query, values);
        return rows[0];
    }
}

module.exports = LanchaModel;
