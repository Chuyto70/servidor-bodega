const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

//base de datos

mongoose.connect('mongodb+srv://Chuyto70:iQTkUxGNuN8t5rGJ@cluster0.cgvyq.mongodb.net/bodega', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => {
        console.log('Base de datos conectada');
    })
    .catch(err => {
        console.log(err);
    })

app.use('/', express.static(__dirname + '/public'))


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// PUERTO y SERVIDOR 
app.set('port', process.env.PORT || 3000);


app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto', app.get('port'));
})

//Rutas
app.use(cors())
app.use(require('./routes/materia.routes.js'))


module.exports = app;