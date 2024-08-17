const nombre = document.querySelector('#nombre')
const correo = document.querySelector('#correo')
const mensaje = document.querySelector('#mensaje')
const formulario = document.querySelector('#form')
const btnEnviar = document.querySelector('#enviarForm')
console.log(formulario)

const datosForm = {
    nombre:'',
    correo:'',
    mensaje:''
}


nombre.addEventListener('input',leerDatos)
correo.addEventListener('input',leerDatos)
mensaje.addEventListener('input',leerDatos)

btnEnviar.addEventListener('click', function (e){
    e.preventDefault()
    
    const { nombre, correo, mensaje } = datosForm
    
    if(nombre ==='' || correo ==='' || mensaje ===''){
        mostrarAlerta('Todos los campos son obligatorios.', true)
        return;
    }
    
    mostrarAlerta('El formulario ha sido enviado. 😁')
})

//lee lo que se ingresa al input   
function leerDatos(e){
    datosForm[e.target.id] = e.target.value
}

function mostrarAlerta(mensajeAlerta, error = false){
    const alerta = document.createElement('P')
    alerta.textContent = mensajeAlerta
    
    if(error){
        alerta.classList.add('error')    
    }else{
        alerta.classList.add('correcto')
    }
    
    formulario.appendChild(alerta)

    setTimeout( () =>{
        alerta.remove()
    }, 5000)
}



