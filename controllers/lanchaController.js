const pool = require('../models/db');

// Obtener todas las lanchas
exports.getLanchas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM lanchas ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error("Error en getLanchas:", err);
        res.status(500).json({ error: 'Error al obtener lanchas' });
    }
};

// Agregar una lancha
exports.addLancha = async (req, res) => {
    const { nombre, matricula, lanchero, capacidad, foto } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO lanchas (nombre, matricula, lanchero, capacidad, foto)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [nombre, matricula, lanchero, capacidad, foto]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error en addLancha:", err);
        res.status(500).json({ error: 'Error al agregar lancha' });
    }
};

// Actualizar lancha por ID
exports.updateLancha = async (req, res) => {
    const { id } = req.params;
    const { nombre, matricula, lanchero, capacidad, foto } = req.body;

    try {
        const result = await pool.query(
            `UPDATE lanchas
             SET nombre=$1, matricula=$2, lanchero=$3, capacidad=$4, foto=$5
             WHERE id=$6
             RETURNING *`,
            [nombre, matricula, lanchero, capacidad, foto, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Lancha no encontrada" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error en updateLancha:", err);
        res.status(500).json({ error: 'Error al actualizar lancha' });
    }
};

// Eliminar lancha por ID
exports.deleteLancha = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM lanchas WHERE id=$1 RETURNING *`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Lancha no encontrada" });
        }

        res.json({ message: "Lancha eliminada", lancha: result.rows[0] });
    } catch (err) {
        console.error("Error en deleteLancha:", err);
        res.status(500).json({ error: 'Error al eliminar lancha' });
    }
};
