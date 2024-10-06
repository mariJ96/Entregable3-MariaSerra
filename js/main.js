// Cargar los datos del archivo JSON con Fetch
function cargarUsuarios() {
    fetch('/js/usuarios.json')
        .then(response => response.json())
        .then(data => {
            usuarios = data
            procesarUsuarios(usuario => {
                console.log(`Usuario cargado: Peso: ${usuario.peso}, Altura: ${usuario.altura}, Edad: ${usuario.edad}`)
            })
        })
        .catch(error => {
            mostrarMensaje('error', 'Error al cargar los usuarios')
            console.error(error)
        })
}

// Función para verificar si un número es positivo
function numeropositivo(valornumero) {
    return !isNaN(valornumero) && valornumero > 0
}

let usuarios = []
let valorm, valorh, genero, peso, altura, edad, tmbm, tmbh

// Función para guardar datos en localStorage
function guardarEnLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

// Función para recuperar datos de localStorage
function recuperarDatos(key) {
    return JSON.parse(localStorage.getItem(key))
}

// Función para borrar un dato de localStorage
function borrarDato(key) {
    localStorage.removeItem(key)
}

// Función para vaciar todo localStorage
function vaciarStorage() {
    localStorage.clear()
}

// Función de orden superior para procesar datos de los usuarios
function procesarUsuarios(callback) {
    usuarios.forEach(callback)
}

// Evento para obtener el género
document.getElementById('generoBtn').addEventListener('click', () => {
    genero = document.getElementById('genero').value
    if (genero === '1') {
        valorm = 447.6
    } else if (genero === '2') {
        valorh = 88.36
    }
    guardarEnLocalStorage('genero', genero)
    document.getElementById('pesoDiv').style.display = 'block'
})

// Evento para obtener el peso
document.getElementById('pesoBtn').addEventListener('click', () => {
    try {
        peso = parseInt(document.getElementById('peso').value)
        if (numeropositivo(peso)) {
            guardarEnLocalStorage('peso', peso)
            document.getElementById('alturaDiv').style.display = 'block'
        } else {
            mostrarMensaje('error', 'Ingrese un peso válido.')
        }
    } catch (error) {
        mostrarMensaje('error', 'Error al ingresar el peso')
    }
})

// Evento para obtener la altura
document.getElementById('alturaBtn').addEventListener('click', () => {
    try {
        altura = parseInt(document.getElementById('altura').value)
        if (numeropositivo(altura)) {
            guardarEnLocalStorage('altura', altura)
            document.getElementById('edadDiv').style.display = 'block'
        } else {
            mostrarMensaje('error', 'Ingrese una altura válida.')
        }
    } catch (error) {
        mostrarMensaje('error', 'Error al ingresar la altura')
    }
})

// Evento para obtener la edad
document.getElementById('edadBtn').addEventListener('click', () => {
    try {
        edad = parseInt(document.getElementById('edad').value)
        if (numeropositivo(edad)) {
            guardarEnLocalStorage('edad', edad)
            usuarios.push({ peso, altura, edad })
            document.getElementById('actividadDiv').style.display = 'block'
        } else {
            mostrarMensaje('error', 'Ingrese una edad válida.')
        }
    } catch (error) {
        mostrarMensaje('error', 'Error al ingresar la edad')
    }
})

// Calcular las calorías según el nivel de actividad
document.getElementById('actividadBtn').addEventListener('click', () => {
    try {
        let nivelActividad = document.getElementById('actividad').value
        let factoractividad = [1.2, 1.375, 1.55, 1.725][nivelActividad - 1]

        if (genero === '1') {
            let resultadopesom = peso * 9.2
            let resultadoalturam = altura * 3.1
            let resultadoedadm = edad * 4.3
            tmbm = (valorm + resultadopesom + resultadoalturam) - resultadoedadm
            let caloriasmujer = factoractividad * tmbm
            guardarEnLocalStorage('calorias', caloriasmujer)
            mostrarResultado('Tus calorías diarias son: ' + caloriasmujer)
        } else if (genero === '2') {
            let resultadopesoh = peso * 13.4
            let resultadoalturah = altura * 4.8
            let resultadoedadh = edad * 5.7
            tmbh = (valorh + resultadopesoh + resultadoalturah) - resultadoedadh
            let caloriashombre = factoractividad * tmbh
            guardarEnLocalStorage('calorias', caloriashombre)
            mostrarResultado('Tus calorías diarias son: ' + caloriashombre)
        }
    } catch (error) {
        mostrarMensaje('error', 'Ocurrió un error al calcular las calorías')
    } finally {
        console.log('Proceso de cálculo de calorías finalizado')
    }
})

// Función para mostrar el resultado en el DOM
function mostrarResultado(mensaje) {
    document.getElementById('resultadoCalorias').innerText = mensaje
}

// Función para mostrar mensajes de error o éxito
function mostrarMensaje(tipo, mensaje) {
    if (tipo === 'error') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: mensaje
        })
    } else {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: mensaje
        })
    }
}

// Recuperar datos del usuario al cargar la página
function recuperarDatosUsuario() {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'))
    if (usuarioGuardado) {
        genero = usuarioGuardado.genero
        peso = usuarioGuardado.peso
        altura = usuarioGuardado.altura
        edad = usuarioGuardado.edad
        mostrarResultado('Tus calorías diarias son: ' + usuarioGuardado.calorias)
    }
}

// Llamadas iniciales
cargarUsuarios()
recuperarDatosUsuario()