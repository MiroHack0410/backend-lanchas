const express = require("express");
const router = express.Router();
const usuariosModel = require("../models/usuariosModel");

// 🔹 LOGIN
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
        message: "Inicio de sesión correcto",
        usuario: user.usuario,
        id: user.id
    });
});

// 🔹 REGISTRO
router.post("/registro", async (req, res) => {
    try {
        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.json({
                success: false,
                message: "Faltan datos"
            });
        }

        const nuevoUsuario = await usuariosModel.crearCuenta(usuario, password);

        return res.json({
            success: true,
            message: "Registro exitoso",
            id: nuevoUsuario.id,
            usuario: nuevoUsuario.usuario
        });

    } catch (error) {
        console.error("🔥 Error al registrar:", error);

        return res.json({
            success: false,
            message: "Error interno al registrar"
        });
    }
});

module.exports = router;
