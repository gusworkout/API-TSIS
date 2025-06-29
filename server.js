const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
/*
app.post('/guardar-json', (req, res) => {
    const nuevoDato = req.body;
    fs.readFile('./data/datos.json', 'utf8', (err, data) => {
        const datos = data ? JSON.parse(data) : [];
        datos.push(nuevoDato);
        fs.writeFile('./data/datos.json', JSON.stringify(datos, null, 2), err => {
            if (err) return res.status(500).send('Error al guardar datos.');
            res.send('Datos guardados en JSON correctamente.');
        });
    });
});
*/

app.post('/guardar-bd', (req, res) => {
    const { id, correo, nombre, contrasena, telefono, direccion, fecha } = req.body;
    const conexion = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'redsocial1'
    });
    const query = 'INSERT INTO usuario (id_usuario, correo, usuario, contrasena, telefono, direccion, fecha_cuenta) VALUES (?, ?, ?, ?, ?, ?, ?)';
    conexion.query(query, [id, correo, nombre, contrasena, telefono, direccion, fecha], (err, resultados) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al guardar en la base de datos.');
        }
        res.send('Datos guardados en MySQL correctamente.');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
