const express = require("express");
const router = express.Router();
const usuariosModel = require("../models/usuariosModel");

// LOGIN
router.post("/login", async (req, res) => {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.json({ success: false, message: "Faltan datos" });
    }

    const user = await usuariosModel.iniciarSesion(usuario, password);

    if (!user) {
        return res.json({ success: false, message: "Credenciales inválidas" });
    }

    res.json({
        success: true,
        usuario: user.usuario,
        id: user.id
    });
});

// CREAR CUENTA
router.post("/crear", async (req, res) => {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.json({ success: false, message: "Faltan datos" });
    }

    try {
        const newUser = await usuariosModel.crearCuenta(usuario, password);

        res.json({
            success: true,
            usuario: newUser.usuario,
            id: newUser.id
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Error al crear usuario: " + error.message
        });
    }
});

module.exports = router;

