const express = require('express');
const cors = require('cors');
const lanchaRoutes = require('./routes/lanchaRoutes');
const initDB = require("./utils/initDB");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api', lanchaRoutes);

// Ruta principal
app.get("/", (req, res) => {
    res.send("Backend funcionando correctamente 🚤");
});

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
