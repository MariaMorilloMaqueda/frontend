// DECLARACIÓN DE VARIABLES
let valoresCorrectos = false; // Se utiliza un booleano para salir del bucle.
let cadena, caracter, repeticiones, caracActual;
let resultado = "";

// MANEJO DE ERRORES CON BUCLE
// El bucle se repite al menos 1 vez o más mientras los valores introducidos sean erróneos.
do {
    // Declaración de variables dentro del bucle
    let cadIntorducida = prompt("Introduce una cadena de texto:", "");
    let caracIntroducido = prompt("Introduce el caracter que desee modificar:", "");
    let repIntroducida = prompt("Introduce el número de repeticiones:", "");

    // ESTRUCTURA CONDICIONAL
    /*Primero se comprueba si el usuario cancela el algoritno, sino el bucle continúa la ejecución.
    Si el usuario pulsa "cancelar" el valor retornado es null, por lo que se maneja dicho valor en la condición.*/
    if ((cadIntorducida === null) || (caracIntroducido === null) || (repIntroducida === null)) {
        document.write("El usuario ha cancelado el algoritmo.");
        valoresCorrectos = true;
    } else {
        // Damos los valores que introduce el usuario a las variables establecidas.
        /*Para asegurarnos de que estamos trabajando con números y no con cadenas
        convertimos el número de repeticiones introducido a entero con parseInt.*/
        repeticiones = parseInt (repIntroducida);
        cadena = cadIntorducida;
        caracter = caracIntroducido;

        // ESTRUCTURA CONDICIONAL
        //Si el usuario introduce una cadena vacía, más de un caracter, un valor no numérico o un número negativo se repite el bucle.
        if ((cadena === "") || (caracter === "")) {
            alert("Error: La cadena no puede estar vacía.");
            valoresCorrectos = false;
        } else if (caracter.length !== 1) {
            alert("Error: Debes introducir sólo 1 caracter.");
            valoresCorrectos = false;
        } else if ((isNaN(repeticiones)) || (repeticiones < 0)) {
            alert("Error: Debes introducir un número positivo o 0.");
            valoresCorrectos = false;
        } else {
            document.write("La cadena introducida es: " + cadena + "<br>");
            document.write("El caracter a modificar es: " + caracter + "<br>");
            document.write("El número de repeticiones es: " + repeticiones + "<br><br>");
            valoresCorrectos = true;
        }
    }
} while (!valoresCorrectos);

// MODIFICACIÓN CON BUCLE FOR
// Para realizar las modificaciones se recorre la primera cadena con un bucle for.
for (let i = 0; i < cadena.length; i++) {
    caracActual = cadena.charAt(i);  // Damos el valor del caracter en la posición actual a la variable declarada al inicio.
    /* Estructura condicional: si el caracter actual coincide con el caracter introducido por el usuario 
    entonces se procede a añadir el caracter a la cadena teniendo en cuenta las repeticiones.
    Para ello se utliza un segundo bucle for. La cadena resultante se almacena en la variable resultado.
    Sino, se agrega el caracter actual a la cadena sin alteraciones.*/
    if (caracActual.toLowerCase() === caracter.toLowerCase()) {  // Se pasan todos los caracteres a minúsculas con .toLowerCase() para compararlos independientemente de si son mayúsculas o minúsculas.
        // Segundo bucle for que repite el carcter introducido tantas veces como repeticiones haya introducido el usario.
        for (let j = 0; j < repeticiones; j++) {
            resultado += caracActual;
        }
    } else {
        resultado += caracActual;
    }
}

// Salida de resultado
document.write ("Resultado final: " + resultado);