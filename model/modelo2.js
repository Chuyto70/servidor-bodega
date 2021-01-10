const { Schema, model } = require('mongoose')

const entradaSalida = new Schema({
    nombre: { type: String, required: true },
    unidad: { type: String },
    stock: { type: Number },
    fecha: { type: String },
    opciones: { type: String }

}, {
    versionKey: false
})

module.exports = model('entradaSalida', entradaSalida)