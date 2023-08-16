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

function registerUser() {
    const username = regUsernameInput.value;
    const password = regPasswordInput.value;
    if (username === '' || password === '') {
        swal.fire('Por favor, completa todos los campos.');
        return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((user) => user.username === username);
    if (userExists) {
        Swal.fire({
            icon: 'info',
            title: 'Atencion',
            text: 'El usuario ya existe. Por favor, elige otro nombre de usuario.',
        });
        return;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    swal.fire('Registro exitoso. Ahora puedes iniciar sesión.');
    showLogin();
}

function loginUser() {
    const username = loginUsernameInput.value;
    const password = loginPasswordInput.value;
    if (username === '' || password === '') {
        swal.fire('Por favor, completa todos los campos.');
        return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.username === username);
    if (!user) {
        swal.fire('Usuario inexistente. Por favor, verifica tus datos.');
        return;
    }
    if (user.password !== password) {
        swal.fire('Contraseña incorrecta. Por favor, verifica tus datos.');
        return;
    }
    swal.fire('Inicio de sesión exitoso.');
    localStorage.setItem("sesionIniciada", "true");
    window.location.href = '../pages/turnos.html';
}
document.getElementById('registerBtn').addEventListener('click', registerUser);
document.getElementById('loginBtn').addEventListener('click', loginUser);

showLogin();
