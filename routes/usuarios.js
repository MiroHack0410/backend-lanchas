const express = require("express");
const router = express.Router();
const usuariosModel = require("../models/usuariosModel");

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

module.exports = router;
