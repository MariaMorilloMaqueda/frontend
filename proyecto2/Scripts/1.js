// DECLARACIÓN DE VARIABLES
// Se declaran 5 número aleatorios entre 0 y 9.
let numAleatorio1 = Math.random() * 9;
let numAleatorio2 = Math.random() * 9;
let numAleatorio3 = Math.random() * 9;
let numAleatorio4 = Math.random() * 9;
let numAleatorio5 = Math.random() * 9;

// Se redondea cada número a un formato sin decimales con Math.round()
// Luego se convierte cada número a cadena de texto con .toString()
let cadena1 = Math.round(numAleatorio1).toString();
let cadena2 = Math.round(numAleatorio2).toString();
let cadena3 = Math.round(numAleatorio3).toString();
let cadena4 = Math.round(numAleatorio4).toString();
let cadena5 = Math.round(numAleatorio5).toString();

// Se concatenan las 5 cadenas
let resultado = cadena1 + cadena2 + cadena3 + cadena4 + cadena5;

// Para el reintegro se obtiene el número en quinta posición sabiendo que la primera posición es 0 y la quinta 4 con .charAt()
let reintegro = resultado.charAt(4);

// Se imprimen las salidas por pantalla con Template Strings 
document.write (`El décimo ganador ha sido: ${resultado}. `);
document.write (`Siendo el reintegro el número ${reintegro}.`);