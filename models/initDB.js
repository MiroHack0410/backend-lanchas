const pool = require("./db");

const initDB = async () => {
    try {
        console.log("🔹 initDB ejecutado (sin crear tablas ni usuarios)");
    } catch (err) {
        console.error("❌ Error al inicializar la base de datos:", err);
    }
};

initDB();

module.exports = initDB;
