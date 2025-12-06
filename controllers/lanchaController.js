const pool = require('../models/db');

// Obtener todas las lanchas
exports.getLanchas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM lanchas ORDER BY matricula ASC');
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

// Actualizar lancha
exports.updateLancha = async (req, res) => {
    const { nombre, matricula, lanchero, capacidad, foto } = req.body;

    try {
        const result = await pool.query(
            `UPDATE lanchas
             SET nombre=$1, lanchero=$2, capacidad=$3, foto=$4
             WHERE matricula=$5
             RETURNING *`,
            [nombre, lanchero, capacidad, foto, matricula]
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
