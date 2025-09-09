// DECLARACIÓN DE VARIABLES
let valoresCorrectos = false; // Se utiliza un booleano para salir del bucle.
let lado, area, volumen, altura;

// MANEJO DE ERRORES CON BUCLE
// El bucle se repite al menos 1 vez o más mientras el valor introducido sea erróneos.
do {
    let valorLado = prompt("Introduce el valor de la longitud de la arista (L) del tetraedro (en cm)", "");

    // ESTRUCTURA CONDICIONAL
    /*Primero se comprueba si el usuario cancela el algoritno, sino el bucle continúa la ejecución.
    Si el usuario pulsa "cancelar" el valor retornado es null, por lo que se maneja dicho valor en la condición.*/
    if ((valorLado === null)) {
        document.write("El usuario ha cancelado el algoritmo.");
        valoresCorrectos = true;
    } else {
        // Damos los valores que introduce el usuario a la variable establecida.
        /* Convertimos la cadena introducida a número flotante con parseFloat.*/
        lado = parseFloat(valorLado);

        // ESTRUCTURA CONDICIONAL
        //Si el usuario introduce una cadena vacía o un valor no numérico se repite el bucle.
        if (isNaN(lado)) {
            alert("Error: Debes introducir un número.");
            valoresCorrectos = false;
        } else {
            document.write("El valor introducido para el lado (L) del tetraedro es: " + lado + " cm.<br><br>");
            valoresCorrectos = true;
            
            // OPERACIONES MATEMÁTICAS
            /*Se realizan las correspondientes operaciones matemáticas:
            1. Para calcular la altura de un tetraedro primero se realizar la raíz cuadrada de 6, esta se divide entre 3 y el resultado se multipibla por el valor del lado.
            2. Para calcular el área el valor del lado se eleva a 2 y se multiplica por la raíz cuadrada de 3.
            3. Para calcular el volumen el valor del lado se eleva a 3 y se multiplica por el resultado de la raíz cuadrada de 2 entre 12.
            Para calcular la raíz cuadrada se ha utilizado el método .sqrt(x) del objeto Math.
            Para calcular la potencia se ha utlizado el método .pow() del objeto Math*/
            altura = lado * (Math.sqrt(6) / 3);
            area = Math.pow(lado,2) * Math.sqrt(3);
            volumen = Math.pow(lado,3) * (Math.sqrt(2) / 12);

            // Salida de resultado
            // Para redondear a 2 decimales se ha utilizado el método .toFixed() del objeto Number.
            document.write("Calculando su altura (h), área (A) y volumen (V) ...<br><br>");
            document.write("h: " + altura.toFixed(2) + " cm.<br>");
            document.write("A: " + area.toFixed(2) + " cm.<br>");
            document.write("V: " + volumen.toFixed(2) + " cm.<br>");
        }
    }
} while (!valoresCorrectos);