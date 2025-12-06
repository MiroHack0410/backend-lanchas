const db = require("./db");

module.exports = {
    // Obtener todas las lanchas
    obtenerLanchas: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM lanchas", [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    // Crear una lancha NUEVA
    crearLancha: (lancha) => {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO lanchas (nombre, matricula, lanchero, capacidad)
                VALUES (?, ?, ?, ?)
            `;

            db.run(sql,
                [lancha.nombre, lancha.matricula, lancha.lanchero, lancha.capacidad],
                function (err) {
                    if (err) reject(err);
                    else resolve(lancha);
                }
            );
        });
    },

    // Actualizar lancha por nombre
    actualizarLancha: (nombre, datos) => {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE lanchas
                SET matricula = ?, lanchero = ?, capacidad = ?
                WHERE nombre = ?
            `;

            db.run(sql,
                [datos.matricula, datos.lanchero, datos.capacidad, nombre],
                function (err) {
                    if (err) reject(err);

                    if (this.changes === 0) {
                        resolve(null); // No encontró
                    } else {
                        resolve({ nombre, ...datos });
                    }
                }
            );
        });
    }
};
