document.addEventListener("DOMContentLoaded", function () {
    let sesionIniciada = localStorage.getItem("sesionIniciada");
    if (!sesionIniciada || sesionIniciada !== "true") {
        window.location.href = "../pages/ingreso.html";
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    const altaTurno = () => {
        app.innerHTML = `
        <div class="container">
            <div class="form-content">
                <h2 id=h2>Alta de Turno</h2>
                <form id="formAlta">
                    <label for="historiaClinica">Número de Historia Clínica:</label>
                    <input type="text" id="historiaClinica" required><br>
                    
                    <label for="nombreApellido">Apellido y Nombre:</label>
                    <input type="text" id="nombreApellido" required><br>
                    
                    <label for="diaTurno">Día del Turno:</label>
                    <input type="date" id="diaTurno" required><br>
                    
                    <label for="horaTurno">Horario del Turno (de 7:30 a 9:30):</label>
                    <input type="time" id="horaTurno" min="07:30" max="09:30" required><br>
                    
                    <button type="submit" id="btnReg">Registrar Turno</button>
                </form>
            </div>
            <dic class="image-container">
                <img src="../img/turnos.jpg" alt="Imagen" />
            </dic>
        </div>
        `;
        const formAlta = document.getElementById("formAlta");
        formAlta.addEventListener("submit", (event) => {
            event.preventDefault();
            const historiaClinica = document.getElementById("historiaClinica").value;
            const nombreApellido = document.getElementById("nombreApellido").value.toUpperCase();
            const diaTurno = document.getElementById("diaTurno").value;
            const horaTurno = document.getElementById("horaTurno").value;
            const turno = {
                historiaClinica,
                nombreApellido,
                diaTurno, horaTurno
            };

            guardarTurno(turno);
            Swal.fire({
                icon: 'success',
                title: 'Turno registrado exitosamente!',
                text: 'El turno ha sido registrado con éxito.',
            });
            formAlta.reset();
        });
    };
    const guardarTurno = (turno) => {
        let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
        turnos.push(turno);
        localStorage.setItem("turnos", JSON.stringify(turnos));
    };
    altaTurno();

    function logoutUser() {
        localStorage.removeItem("sesionIniciada");
        window.location.href = '../pages/ingreso.html';
    }
    document.getElementById('logoutBtn').addEventListener('click', logoutUser);
});
