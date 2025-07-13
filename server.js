const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/guardarUsuario-bd', (req, res) => {
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

app.post('/guardarPubliacion-bd', (req, res) => {
    const { fechapublicacion, idusuario, descripcion, etiqueta, 
        idcomentario, numcomentario, idcompartido, numreaccion, vista, img} = req.body;
    const conexion = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'redsocial1'
    });
    const query = 'INSERT INTO publicacion (fechapublciacion, idusuario, descripcion, etiqueta, idcomentario,numreacciones, idreaccion, vistas, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    conexion.query(query, [fechapublicacion, idusuario, descripcion, etiqueta, 
        idcomentario, numcomentario, idcompartido, numreaccion, vista, img], (err, resultados) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al guardar en la base de datos.');
        }
        res.send('Datos guardados en MySQL correctamente.');
    });
});

app.post('/guardarComentario-bd', (req, res) => {
    const { id_comentario, fechacomentario, descripcion, respuesta, reaccion, numRespuestas} = req.body;
    const conexion = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'redsocial1'
    });
    const query = 'INSERT INTO comentario (iddecomentario, fechadecomentario, descripcion, respuesta, reaccion, numeroderespuesta) VALUES (?, ?, ?, ?, ?, ?)';
    conexion.query(query, [id_comentario, fechacomentario, descripcion, respuesta, reaccion, numRespuestas], (err, resultados) => {
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
