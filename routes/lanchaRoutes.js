const express = require('express');
const router = express.Router();
const LanchaModel = require('../models/lanchaModel');

// Obtener todas las lanchas
router.get('/lanchas', async (req, res) => {
    try {
        const data = await LanchaModel.obtenerLanchas();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener lanchas" });
    }
});

// Obtener lancha por nombre
router.get('/lanchas/:nombre', async (req, res) => {
    try {
        const lancha = await LanchaModel.obtenerPorNombre(req.params.nombre);

        if (!lancha) {
            return res.status(404).json({ error: "Lancha no encontrada" });
        }

        res.json(lancha);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener lancha" });
    }
});

// Insertar lancha
router.post('/lanchas', async (req, res) => {
    try {
        const nueva = await LanchaModel.crearLancha(req.body);
        res.json(nueva);
    } catch (error) {
        res.status(500).json({ error: "Error al crear lancha" });
    }
});

// Actualizar lancha por nombre
router.put('/lanchas/:nombre', async (req, res) => {
    try {
        const lancha = await LanchaModel.actualizarLancha(req.params.nombre, req.body);

        if (!lancha) {
            return res.status(404).json({ error: "Lancha no encontrada" });
        }

        res.json(lancha);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar lancha" });
    }
});

module.exports = router;
