const express = require('express');
const cors = require('cors');
const lanchaRoutes = require('./routes/lanchaRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', lanchaRoutes);

// Mensaje raíz
app.get("/", (req, res) => {
    res.send("Backend funcionando correctamente 🚤");
});

// Inicializar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
