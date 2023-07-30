const registerForm = document.getElementById('register');
const loginForm = document.getElementById('login');
const regUsernameInput = document.getElementById('regUsername');
const regPasswordInput = document.getElementById('regPassword');
const loginUsernameInput = document.getElementById('loginUsername');
const loginPasswordInput = document.getElementById('loginPassword');

function showRegister() {
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
}

function showLogin() {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
}

// Registrar un usuario
function registerUser() {
    const username = regUsernameInput.value;
    const password = regPasswordInput.value;

    if (username === '' || password === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Verificar si el usuario ya existe en localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((user) => user.username === username);

    if (userExists) {
        alert('El usuario ya existe. Por favor, elige otro nombre de usuario.');
        return;
    }
    //Agrega usuario
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    showLogin();
}

function loginUser() {
    const username = loginUsernameInput.value;
    const password = loginPasswordInput.value;

    if (username === '' || password === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Verificar si el usuario existe en localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.username === username);

    if (!user) {
        alert('Usuario inexistente. Por favor, verifica tus datos.');
        return;
    }

    if (user.password !== password) {
        alert('Contraseña incorrecta. Por favor, verifica tus datos.');
        return;
    }

    alert('Inicio de sesión exitoso.');
    localStorage.setItem("sesionIniciada", "true");
    // Mandar a turnos.html
    window.location.href = 'turnos.html';
}

document.getElementById('registerBtn').addEventListener('click', registerUser);
document.getElementById('loginBtn').addEventListener('click', loginUser);

showLogin();
