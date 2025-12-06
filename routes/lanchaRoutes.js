const express = require('express');
const router = express.Router();
const LanchaModel = require('../models/lanchaModel');

router.get('/lanchas', async (req, res) => {
    try {
        const data = await LanchaModel.obtenerLanchas();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener lanchas" });
    }
});

router.post('/lanchas', async (req, res) => {
    try {
        const nueva = await LanchaModel.crearLancha(req.body);
        res.json(nueva);
    } catch (error) {
        res.status(500).json({ error: "Error al crear lancha" });
    }
});

module.exports = router;
