// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Conexión a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para crear la tabla `usuario`
app.post('/crear-tabla', (req, res) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS usuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            correo VARCHAR(255) NOT NULL,
            contrasena VARCHAR(255) NOT NULL
        )
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al crear la tabla:', err);
            return res.status(500).send('Error al crear la tabla');
        }
        res.send('Tabla `usuario` creada exitosamente');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
