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
        const nombre = req.params.nombre;
        const datos = req.body;

        const lancha = await LanchaModel.actualizarLancha(nombre, datos);

        if (!lancha) {
            return res.status(404).json({ error: "Lancha no encontrada" });
        }

        res.json(lancha);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar lancha" });
    }
});

module.exports = router;
