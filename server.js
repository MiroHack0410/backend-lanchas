const express = require('express');
const cors = require('cors');
const lanchaRoutes = require('./routes/lanchaRoutes');
const usuarioRoutes = require('./routes/usuarios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializar conexión a BD
require('./models/initDB');

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', lanchaRoutes);
app.use('/api', usuarioRoutes);

// Ruta principal
app.get("/", (req, res) => {
    res.send("Backend funcionando correctamente 🚤");
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
