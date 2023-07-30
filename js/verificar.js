document.addEventListener("DOMContentLoaded", function () {
    var sesionIniciada = localStorage.getItem("sesionIniciada");

    //si el usuario no inicio sesion, lo manda al que ingrese
    if (!sesionIniciada || sesionIniciada !== "true") {
        window.location.href = "ingreso.html";
    }
});