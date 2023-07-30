document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', handleSubmit);
});

function handleSubmit(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('message').value;

    if (!validateInput(nombre, apellido, telefono, email, mensaje)) {
        return;
    }

    const confirmationMessage = `Confirma los datos ingresados?: 
* Apellido: ${apellido}
* Nombre: ${nombre}
* Telefono: ${telefono}
* Mail: ${email}
* Consulta: ${mensaje}`;

    if (confirm(confirmationMessage)) {
        alert("Gracias por dejarnos su consulta. Pronto nos comunicaremos con Ud.");
        const data = {
            nombre,
            apellido,
            telefono,
            email,
            mensaje,
        };
        localStorage.setItem('contactData', JSON.stringify(data));
        reset
        resetForm();
    } else {
        alert("Ingresa nuevamente los datos");
    }
}

function validateInput(nombre, apellido, telefono, email, mensaje) {
    if (nombre.trim() === "" || apellido.trim() === "" || telefono.trim() === "" || email.trim() === "" || mensaje.trim() === "") {
        alert("Todos los campos son obligatorios. Por favor, complete todos los campos.");
        return false;
    }

    if (isNaN(telefono)) {
        alert("Debes ingresar un número válido para el teléfono.");
        return false;
    }
    return true;
}

function resetForm() { 
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    }
