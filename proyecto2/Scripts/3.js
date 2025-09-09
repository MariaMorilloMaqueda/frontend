// DECLARACIÓN DE VARIABLES.
// Almacenamos los objetos bluetooth y geolocation en variables.
let soporteBluetooth = 'bluetooth';
let geolocalizacion = 'geolocation';

// Primero se comprueba si el navegador admite bluetooth mediante el objeto navigator.bluetooth.
// Si no está definido, el navegador no es compatible con bluetooth.
if (soporteBluetooth in navigator) {
    document.write("Este navegador tiene bluetooth disponible.<br>");
} else {
    document.write("Este navegador no tiene bluetooth disponible.<br>");
}

// Primero se comprueba si el navegador admite geolocalización mediante el objeto navigator.geolocation.
// Si no está definido, el navegador no es compatible con geolocation.
if (geolocalizacion in navigator) {
    document.write("Este navegador tiene geolocalización.");
} else {
    document.write("Este navegador no tiene geolocalización.");
}