let btnES = document.getElementById('btnES')
let resultado2 = document.getElementById('resultado2')

let item2 = document.getElementById('item2')
let unidad2 = document.getElementById('unidad2')
let cantidad = document.getElementById('cantidad')
let fecha = document.getElementById('fecha')
let opciones = document.getElementById('opciones')
let data;

function borrarMateria(id) {
    console.log(id);
    if (confirm('¿Estas seguro que deseas eliminar la materia prima?')) {
        axios.delete(`http://localhost:3000/borrar/${id}`)
            .then(res => {

                alert(res.data.mensaje)
                window.location.reload()

            })
            .catch(err => console.log(err))
    }

}

function getData() {

    axios.get('http://localhost:3000/entrada').then((result) => {
        data = result.data
        let color = ""
        for (let dato of data) {
            if (dato.opciones == 'Salida') {
                color = "red"
            } else {
                color = "green"
            }
            resultado2.innerHTML += `
                
            <tr>
            <td id ="paraEditar">${dato.nombre}
                          <a onclick="borrarMateria('${dato._id} ')"  class="btn btn-danger" id="borrar"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-archive-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                          </svg></a></td>

                <td>${dato.unidad}</td>
                <td>${dato.stock}</td>
                <td>${dato.fecha}</td>
                <td style="color: ${color}">${dato.opciones}</td>
            </tr>
        
        `

        }


    }).catch((err) => {
        console.log(err)
    });
}
getData()


btnES.addEventListener('click', function(e) {
    e.preventDefault()
    if (!item2.value || item2.value === undefined || item2.value === null) {
        return alert('DEBER INGRESAR NOMBRE OBLIGATORIAMENTE')
    }
    axios.post('http://localhost:3000/entrada', {
            nombre: item2.value,
            fecha: fecha.value,
            unidad: unidad2.value,
            stock: cantidad.value,
            opciones: opciones.value
        })
        .then((result) => {

            let restarA = result.data

            axios.get('https://servidor-bodega.herokuapp.com/listado')
                .then((dat) => {
                    console.log(restarA);
                    let info = dat.data
                    for (let informacion of info) {
                        let nombre2 = restarA.nuevo.nombre.toLowerCase()
                        let nombre = informacion.nombre.toLowerCase()
                        if (nombre.indexOf(nombre2) !== -1 && restarA.nuevo.opciones == 'Salida') {
                            axios.put(`https://servidor-bodega.herokuapp.com/${informacion._id}`, { stock: informacion.stock - restarA.nuevo.stock }, { 'Content-Type': 'application/json' }).then((resp) => {
                                console.log(resp);
                            }).catch(err => console.log(err))
                            console.log(informacion)
                        }
                        if (nombre.indexOf(nombre2) !== -1 && restarA.nuevo.opciones == 'Entrada') {
                            axios.put(`https://servidor-bodega.herokuapp.com/${informacion._id}`, { stock: informacion.stock + restarA.nuevo.stock }, { 'Content-Type': 'application/json' }).then((resp) => {
                                console.log(resp);
                            }).catch(err => console.log(err))
                            console.log(informacion)
                        } else {
                            return alert('LA MATERIA PRIMA NO EXISTE EN EL INVETARIO')
                        }


                    }

                })
                .catch((err) => {
                    console.log(err);
                })


            form.reset()



        }).catch((err) => {
            console.log(err);
        });
})