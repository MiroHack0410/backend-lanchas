const pool = require('../models/db');

// Obtener todas las lanchas
exports.getLanchas = async (req, res) => {
    try {
        console.log("GET /lanchas llamado"); // log para debug
        const [rows] = await pool.query('SELECT * FROM lanchas ORDER BY id ASC');
        console.log("Lanchas obtenidas:", rows);
        res.json(rows);
    } catch (err) {
        console.error("Error en getLanchas:", err);
        res.status(500).json({ error: 'Error al obtener lanchas' });
    }
};

// Agregar una lancha
exports.addLancha = async (req, res) => {
    const { nombre, matricula, lanchero, capacidad, foto } = req.body;
    console.log("POST /lanchas llamado con:", req.body); // log para debug

    // Validaciones básicas
    if (!nombre || !matricula || !lanchero || !capacidad) {
        console.warn("Faltan datos para agregar lancha");
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO lanchas (nombre, matricula, lanchero, capacidad, foto) VALUES (?, ?, ?, ?, ?)',
            [nombre, matricula, lanchero, capacidad, foto]
        );
        console.log("Lancha agregada con id:", result.insertId);
        res.status(201).json({ id: result.insertId, nombre, matricula, lanchero, capacidad, foto });
    } catch (err) {
        console.error("Error en addLancha:", err);
        res.status(500).json({ error: 'Error al agregar lancha' });
    }
};

// Actualizar lancha por id
exports.updateLancha = async (req, res) => {
    const { id } = req.params;
    const { nombre, matricula, lanchero, capacidad, foto } = req.body;
    console.log(`PUT /lanchas/${id} llamado con:`, req.body);

    if (!nombre || !matricula || !lanchero || !capacidad) {
        console.warn("Faltan datos para actualizar lancha");
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    try {
        const [result] = await pool.query(
            'UPDATE lanchas SET nombre=?, matricula=?, lanchero=?, capacidad=?, foto=? WHERE id=?',
            [nombre, matricula, lanchero, capacidad, foto, id]
        );
        if (result.affectedRows === 0) {
            console.warn("Lancha no encontrada con id:", id);
            return res.status(404).json({ error: 'Lancha no encontrada' });
        }
        console.log("Lancha actualizada con id:", id);
        res.json({ id, nombre, matricula, lanchero, capacidad, foto });
    } catch (err) {
        console.error("Error en updateLancha:", err);
        res.status(500).json({ error: 'Error al actualizar lancha' });
    }
};
