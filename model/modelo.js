const { Schema, model } = require('mongoose')

const materiaPrima = new Schema({
    nombre: { type: String, required: true },
    proveedor: { type: String },
    lote: { type: String },
    retest: { type: String },
    unidad: { type: String },
    stock: { type: Number }

}, {
    versionKey: false
})

module.exports = model('MateriaPrima', materiaPrima)