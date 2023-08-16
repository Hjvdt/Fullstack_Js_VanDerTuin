let contactos = [];

const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const emailInput = document.getElementById('email');
const telefonoInput = document.getElementById('phone');
const mensajeInput = document.getElementById('message');
const formulario = document.getElementById('contactForm');

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const email = emailInput.value;
    const telefono = telefonoInput.value;
    const mensaje = mensajeInput.value;

    const contacto = {
        nombre,
        apellido,
        email,
        telefono,
        mensaje
    };

    contactos.push(contacto);

    localStorage.setItem('contactos', JSON.stringify(contactos));

    nombreInput.value = '';
    apellidoInput.value = '';
    emailInput.value = '';
    telefonoInput.value = '';
    mensajeInput.value = '';

    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Su mensaje ha sido enviado correctamente.',
    });
});

window.addEventListener('load', function () {
    const contactosGuardados = localStorage.getItem('contactos');
    if (contactosGuardados) {
        contactos = JSON.parse(contactosGuardados);
    }
});

