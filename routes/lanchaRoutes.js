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

// Obtener lancha por ID
router.get('/lanchas/:id', async (req, res) => {
    try {
        const lancha = await LanchaModel.obtenerPorId(req.params.id);

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
        res.status(201).json(nueva);
    } catch (error) {
        res.status(500).json({ error: "Error al crear lancha" });
    }
});

// Actualizar lancha por ID
router.put('/lanchas/:id', async (req, res) => {
    try {
        const lancha = await LanchaModel.actualizarLancha(req.params.id, req.body);

        if (!lancha) {
            return res.status(404).json({ error: "Lancha no encontrada" });
        }

        res.json(lancha);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar lancha" });
    }
});

// Eliminar lancha por ID
router.delete('/lanchas/:id', async (req, res) => {
    try {
        const lancha = await LanchaModel.eliminarLancha(req.params.id);

        if (!lancha) {
            return res.status(404).json({ error: "Lancha no encontrada" });
        }

        res.json({ message: "Lancha eliminada", lancha });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar lancha" });
    }
});

module.exports = router;
