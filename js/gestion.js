document.addEventListener("DOMContentLoaded", () => {
    const gestionTurnos = document.getElementById("gestionTurnos");


    const cargaGestionTurnos = () => {
        const btnBuscar = document.getElementById("btnBuscar");
        const btnMostrar = document.getElementById("btnMostrar");
        const resultadoBuscar = document.getElementById("resultado");
        const btnVolver = document.getElementById("btnVolver");
        btnVolver.addEventListener("click", () => {
            window.location.href = "../pages/turnos.html";
        });

        btnBuscar.addEventListener("click", () => {
            const nroHistoria = document.getElementById("numeroHistoria");
            const historiaClinica = nroHistoria.value;
            const turnos = obtenerTurnos();
            const turnoEncontrado = turnos.find(turno => turno.historiaClinica === historiaClinica);
            if (turnoEncontrado) {
                const diaFormateado = new Date(turnoEncontrado.diaTurno).toLocaleDateString('es-ES');
                resultadoBuscar.innerHTML = `
                    <h3>Turno Encontrado</h3>
                    <p>Número de Historia Clínica: ${turnoEncontrado.historiaClinica}</p>
                    <p>Nombre y Apellido: ${turnoEncontrado.nombreApellido}</p>
                    <p>Día del Turno: ${diaFormateado}</p>
                    <p>Horario del Turno: ${turnoEncontrado.horaTurno}</p>
                    <button id="btnEliminar" class="btnEliminar">Eliminar Turno</button>
                    <button id="btnVolver" class="btnVolver">Volver a la Página Anterior</button>
                    <button id="btnVolverBuscar" class="btnVolverBuscar">Volver a Buscar</button>
                    
                `;
                const btnEliminarTurno = document.getElementById("btnEliminar");

                btnEliminarTurno.addEventListener("click", (event) => {
                    eliminarTurno(historiaClinica);
                    Swal.fire({
                        icon: 'success',
                        title: 'Turno eliminado exitosamente!',
                        text: 'El turno ha sido eliminado con éxito.',
                    }).then(() => {
                        window.location.href = '../pages/gestion.html';
                    });
                    resultadoBuscar.innerHTML = "";
                    nroHistoria.value = "";
                });
                const btnVolver = document.getElementById("btnVolver");
                btnVolver.addEventListener("click", () => {
                    window.location.href = "../pages/turnos.html";
                });
                const btnVolverBuscar = document.getElementById("btnVolverBuscar");
                btnVolverBuscar.addEventListener("click", () => {
                    nroHistoria.value = ""; // Limpiar el campo "Número de Historia Clínica"
                    resultadoBuscar.innerHTML = ""; // Limpiar el resultado
                    cargaGestionTurnos();
                });
            } else {
                resultadoBuscar.innerHTML = `<p>No se encontró ningún turno con ese número de historia clínica.</p>`;
            }
        });

        btnMostrar.addEventListener("click", () => {
            const turnos = obtenerTurnos();
            if (turnos.length > 0) {
                resultadoBuscar.innerHTML = "<h3>Listado de Turnos</h3>";
                turnos.forEach(turno => {
                    const diaFormateado = new Date(turno.diaTurno).toLocaleDateString('es-ES');
                    resultadoBuscar.innerHTML += `
                        <div class="turno-card">
                            <p>Número de Historia Clínica: ${turno.historiaClinica}</p>
                            <p>Nombre y Apellido: ${turno.nombreApellido}</p>
                            <p>Día del Turno: ${turno.diaTurno}</p>
                            <p>Horario del Turno: ${turno.horaTurno}</p>
                        </div>
                    `;
                });
            } else {
                resultadoBuscar.innerHTML = "<p>No hay turnos registrados.</p>";
            }
        });
    };

    const obtenerTurnos = () => {
        return JSON.parse(localStorage.getItem("turnos")) || [];
    };

    const eliminarTurno = (historiaClinica) => {
        const turnos = obtenerTurnos();
        const nuevosTurnos = turnos.filter(turno => turno.historiaClinica !== historiaClinica);
        localStorage.setItem("turnos", JSON.stringify(nuevosTurnos));
    };
    cargaGestionTurnos();

    gestionTurnos.addEventListener("click", cargaGestionTurnos);
});
