const express = require('express');
const cors = require('cors');
const lanchaRoutes = require('./routes/lanchaRoutes');
const usuarioRoutes = require('./routes/usuarios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

require('./models/initDB');

app.use(cors());
app.use(express.json());

app.use('/api', lanchaRoutes);
app.use('/api', usuarioRoutes);

app.get("/", (req, res) => {
    res.send("Backend funcionando correctamente 🚤");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
