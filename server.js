const express = require('express');
const bodyParser = require('body-parser');
const lanchaRoutes = require('./routes/lanchaRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api', lanchaRoutes);

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
