const { Router } = require('express')

const entradaSalida = require('../model/modelo2')
const materiaPrima = require('../model/modelo')
const router = Router()

require('../app')


//OBTENER DATOS
router.get('/entrada', async(req, res) => {
    let entrada = await entradaSalida.find()

    res.json(entrada)
})
router.get('/listado', async(req, res) => {

    const materias = await materiaPrima.find()
    res.json(materias)

})

router.get('/listado/:id', async(req, res) => {
    let id = req.params.id;
    const materia = await materiaPrima.findById(id)
    res.json({ materia })
})

//SUBIR DATO
router.post('/entrada', async(req, res) => {
    let datos = req.body;

    let nuevo = await new entradaSalida(datos)
    await nuevo.save()
    res.status(200).json({ dato: 'Agregado', nuevo })
})
router.post('/nuevaMateria', async(req, res) => {

    let datos = req.body

    const nuevaMateriaPrima = new materiaPrima(datos)
    await nuevaMateriaPrima.save()
    res.json({ mensaje: 'Materia prima creada', nuevaMateriaPrima })

})

//BORRAR DATO
router.delete('/borrar/:id', (req, res) => {
    let id = req.params.id

    entradaSalida.findByIdAndDelete(id, (err) => {
        if (err) {
            return res.json({
                mensaje: err
            })
        }
        res.json({ mensaje: 'Usuario borrado' })
    })
})
router.delete('/:id', (req, res) => {

    let id = req.params.id

    materiaPrima.findByIdAndDelete(id, (err) => {
        if (err) {
            return res.json({
                mensaje: err
            })
        }
        res.json({ mensaje: 'Usuario borrado' })
    })
})

//ACTUALIZAR DATO
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let nuevoDato = req.body


    materiaPrima.findByIdAndUpdate(id, nuevoDato, { new: true }, (err, objeto) => {
        if (err) {
            return res.json({ mensaje: err })
        }
        res.json({
            mensaje: 'Objeto actualizado',
            objeto
        })
    })
})




module.exports = router;