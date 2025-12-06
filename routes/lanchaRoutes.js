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

// Crear lancha
router.post('/lanchas', async (req, res) => {
    try {
        const nueva = await LanchaModel.crearLancha(req.body);
        res.json(nueva);
    } catch (error) {
        res.status(500).json({ error: "Error al crear lancha" });
    }
});

// 🔥 ACTUALIZAR lancha por nombre
router.put('/lanchas/:nombre', async (req, res) => {
    try {
        const nombre = req.params.nombre;
        const datos = req.body;

        const actualizada = await LanchaModel.actualizarLancha(nombre, datos);

        if (!actualizada) {
            return res.status(404).json({ error: "Lancha no encontrada" });
        }

        res.json(actualizada);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar lancha" });
    }
});

module.exports = router;
