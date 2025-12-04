const pool = require('../models/db');

// Obtener todas las lanchas
exports.getLanchas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM lanchas ORDER BY id ASC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener lanchas' });
    }
};

// Agregar una lancha
exports.addLancha = async (req, res) => {
    const { nombre, matricula, lanchero, capacidad, foto } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO lanchas (nombre, matricula, lanchero, capacidad, foto) VALUES (?, ?, ?, ?, ?)',
            [nombre, matricula, lanchero, capacidad, foto]
        );
        res.status(201).json({ id: result.insertId, nombre, matricula, lanchero, capacidad, foto });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al agregar lancha' });
    }
};

// Actualizar lancha por matricula
exports.updateLancha = async (req, res) => {
    const { nombre, matricula, lanchero, capacidad, foto } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE lanchas SET nombre=?, lanchero=?, capacidad=?, foto=? WHERE matricula=?',
            [nombre, lanchero, capacidad, foto, matricula]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Lancha no encontrada' });
        }
        res.json({ nombre, matricula, lanchero, capacidad, foto });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar lancha' });
    }
};