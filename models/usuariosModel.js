const express = require("express");
const router = express.Router();
const { iniciarSesion, crearCuenta } = require("../models/usuarios");

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

        const nuevoUsuario = await crearCuenta(usuario, password);

        return res.json({
            success: true,
            message: "Registro exitoso",
            data: nuevoUsuario
        });

    } catch (error) {
        console.error("🔥 Error en registro:", error);

        return res.json({
            success: false,
            message: "Error interno"
        });
    }
});

// 🔹 LOGIN
router.post("/login", async (req, res) => {
    try {
        const { usuario, password } = req.body;

        const user = await iniciarSesion(usuario, password);

        if (!user) {
            return res.json({
                success: false,
                message: "Usuario o contraseña incorrectos"
            });
        }

        return res.json({
            success: true,
            message: "Inicio de sesión exitoso",
            data: user
        });

    } catch (error) {
        console.error("🔥 Error en login:", error);

        return res.json({
            success: false,
            message: "Error interno"
        });
    }
});

module.exports = router;
