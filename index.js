//const express = require('express'); //Comonjs
import express from "express";
import router from "./routes/index.js"
import db from "./config/db.js";

const app = express();

//Definir el puerto
const port = process.env.PORT || 4000;

//Conectar la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch( error => console.log(error))

//Habilitar pug
app.set('view engine', 'pug');

//Obtener el ano actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = 'Agencia de Viajes';
    next();
});

//Agregar el body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}))

//Definir la carpeta publica
app.use(express.static('public'));

//Agregar el router
app.use('/', router);


app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})