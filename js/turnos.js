class Turno {
    constructor(id, nombrePaciente, fecha, hora) {
        this.id = id;
        this.nombrePaciente = nombrePaciente;
        this.fecha = fecha;
        this.hora = hora;
    }

    mostrarInformacion() {
        return (
            "#" +
            this.id +
            " - Paciente: " +
            this.nombrePaciente +
            " - Fecha: " +
            this.fecha +
            " - Hora: " +
            this.hora
        );
    }

    getId() {
        return this.id;
    }

    setId(nuevoId) {
        this.id = nuevoId;
    }
}

let arregloTurnos = [];

let arregloHorarios = [
    "7:30 am",
    "7:45 am",
    "8:00 am",
    "8:15 am",
    "8:30 am",
    "8:45 am",
    "9:00 am",
    "9:15 am",
    "9:30 am",
    "9:45 am",
    "10:00 am",
];

let contadorId = 1;

document.addEventListener("DOMContentLoaded", () => {
    cargarTurnosDesdeLocalStorage();
});

function mostrarHorarios() {
    let listaHorarios = "";
    if (arregloHorarios.length === 0) {
        listaHorarios = "No hay horarios.";
    } else {
        for (let i = 0; i < arregloHorarios.length; i++) {
            listaHorarios += "\n" + arregloHorarios[i];
        }
    }
    mostrarMensaje(listaHorarios);
}

function agregarTurno() {
    let nombrePaciente = prompt("Ingrese el nombre del paciente:");
    let fecha = prompt("Ingrese la fecha del turno, sólo de Lunes a Viernes (formato: DD/MM/AAAA):");
    let hora = prompt("Ingrese la hora del turno (formato hh:mm):");

    // Verifico si la fecha y hora del turno son válidas
    let fechaValida = /^\d{2}\/\d{2}\/\d{4}$/;
    let horaValida = /^\d{2}:\d{2}$/;

    if (!fechaValida.test(fecha) || !horaValida.test(hora)) {
        alert("La fecha u hora del turno ingresados no son válidos.");
        return;
    }
    arregloTurnos.push(new Turno(contadorId, nombrePaciente, fecha, hora));
    contadorId++;
    guardarTurnosEnLocalStorage();
    mostrarTurnos();
}

function cancelarTurno() {
    let idTurno = prompt("Ingrese el ID del turno a cancelar:");
    let indice = buscarTurno(idTurno);

    if (indice >= 0) {
        arregloTurnos.splice(indice, 1);
        guardarTurnosEnLocalStorage();
        mostrarTurnos();
    } else {
        alert("No se encontró un turno con el ID especificado.");
    }
}

function buscarTurno(idTurno) {
    for (let i = 0; i < arregloTurnos.length; i++) {
        if (arregloTurnos[i].getId() == idTurno) {
            return i;
        }
    }
    return -1;
}

function mostrarTurnos() {
    let listaTurnos = "";
    if (arregloTurnos.length === 0) {
        listaTurnos = "No hay turnos agendados.";
    } else {
        arregloTurnos.sort((a, b) => {
            if (a.fecha > b.fecha) {
                return 1;
            } else if (a.fecha < b.fecha) {
                return -1;
            } else {
                if (a.hora > b.hora) {
                    return 1;
                } else if (a.hora < b.hora) {
                    return -1;
                } else {
                    return 0;
                }
            }
        });
    }

    for (let i = 0; i < arregloTurnos.length; i++) {
        listaTurnos += "\n" + arregloTurnos[i].mostrarInformacion();
    }
    mostrarMensaje(listaTurnos);
}

function mostrarMensaje(mensaje) {
    const outputDiv = document.getElementById("output");
    outputDiv.innerText = mensaje;
}

function guardarTurnosEnLocalStorage() {
    localStorage.setItem("turnos", JSON.stringify(arregloTurnos));
}

function cargarTurnosDesdeLocalStorage() {
    const turnosGuardados = localStorage.getItem("turnos");
    if (turnosGuardados) {
        arregloTurnos = JSON.parse(turnosGuardados).map(
            (turno) => new Turno(turno.id, turno.nombrePaciente, turno.fecha, turno.hora)
        );
        contadorId = arregloTurnos.length + 1;
    }
}

function salir() {
    alert("Gracias por utilizar nuestra página :)");
    guardarTurnosEnLocalStorage();
    window.location.href = '../index.html';
}
