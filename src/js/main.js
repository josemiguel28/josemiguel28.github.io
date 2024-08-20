document.addEventListener('DOMContentLoaded', function () {
    
    iniciarApp();
});

function iniciarApp() {
    closeNavBar();
    navBarTransition();
    navBarTransitionWhenClosign();
    enviarFormulario();
}

function closeNavBar() {
    document.querySelector('#closeNavbar').addEventListener('click', function () {
        let navbarCollapse = document.getElementById('navbarNavAltMarkup');
        navbarCollapse.classList.remove('show');
    });
}

function navBarTransition() {
    var navbarToggler = document.querySelector('.navbar-toggler');
    var navbarCollapse = document.getElementById('navbarNavAltMarkup');

    navbarToggler.addEventListener('click', function () {
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        } else {
            navbarCollapse.classList.add('show');
            navbarCollapse.classList.add('closed')

        }
    });
}

function enviarFormulario() {
    const formulario = document.querySelector('#form');
    const botonEnviar = document.querySelector('#enviarForm');

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const correo = document.querySelector('#correo').value;
        const mensaje = document.querySelector('#mensaje').value;

        if (nombre === '' || correo === '' || mensaje === '') {
            mostrarAlerta('Todos los campos son obligatorios.', true);
            return;
        }

        const datosForm = {
            nombre,
            correo,
            mensaje
        };

        // Deshabilitar el botón de envío y mostrar mensaje de "Enviando..."
        botonEnviar.disabled = true;
        botonEnviar.textContent = 'Enviando...';

        fetch('https://formspree.io/f/xyzgdwzv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosForm)
        })
            .then(response => response.json())
            .then(data => {
                mostrarAlerta('El formulario ha sido enviado. 😁');
                // Rehabilitar el botón de envío y restaurar el texto original
                botonEnviar.disabled = false;
                botonEnviar.textContent = 'Enviar';
            })
            .catch(error => {
                mostrarAlerta('Hubo un error al enviar el formulario.', true);
                // Rehabilitar el botón de envío y restaurar el texto original
                botonEnviar.disabled = false;
                botonEnviar.textContent = 'Enviar';
            });
    });
}

function mostrarAlerta(message, duration = 3000) {
    // Create a div element for the message
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.bottom = '120px';
    messageDiv.style.right = '40px';
    messageDiv.style.padding = '10px';
    messageDiv.style.backgroundColor = '#7c65a9';
    messageDiv.style.color = 'white';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.zIndex = '1000';

    // Append the message to the body
    document.body.appendChild(messageDiv);

    // Remove the message after the specified duration
    setTimeout(() => {
        messageDiv.remove();
    }, duration);
}