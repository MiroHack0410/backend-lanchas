const express = require("express");
const router = express.Router();
const usuariosModel = require("../models/usuariosModel");

// Ruta para crear cuenta
router.post("/crearCuenta", async (req, res) => {
    try {
        const { nombre, matricula, lanchero, capacidad } = req.body;

        // Validación básica
        if (!nombre || !matricula || !lanchero || !capacidad) {
            return res.json({
                success: false,
                message: "Faltan datos"
            });
        }

        // Crear usuario
        const nuevoUsuario = await usuariosModel.crearCuenta(
            nombre,
            matricula,
            lanchero,
            capacidad
        );

        return res.json({
            success: true,
            message: "Cuenta creada correctamente",
            usuario: nuevoUsuario
        });

    } catch (error) {
        console.error("Error al crear cuenta:", error);
        return res.json({
            success: false,
            message: "Error en el servidor"
        });
    }
});

module.exports = router;