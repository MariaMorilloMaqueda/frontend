 // DECLARACIÓN DE VARIABLES
 let valoresCorrectos = false; // Se utiliza un booleano para salir del bucle.
 let mensaje, clave, mensajeCodigo, claveCodigo, operacion;
 let claveRepetida = "";
 let mensajeEncriptado = "";

 // MANEJO DE ERRORES CON BUCLE
 // El bucle se repite al menos 1 vez o más mientras los valores introducidos sean erróneos.
 do {
     // Declaración de variables dentro del bucle
     let mensajeInt = prompt("Introduce un mensaje", "");
     let claveInt = prompt("Introduce una clave:", "");
     
     // ESTRUCTURA CONDICIONAL
     /*Primero se comprueba si el usuario cancela el algoritno, sino el bucle continúa la ejecución.
     Si el usuario pulsa "cancelar" el valor retornado es null, por lo que se maneja dicho valor en la condición.*/
     if ((mensajeInt === null) || (claveInt === null)) {
         document.write("El usuario ha cancelado el algoritmo.");
         valoresCorrectos = true;
     } else {
         // Damos los valores que introduce el usuario a las variables establecidas.
         mensaje = mensajeInt;
         clave = claveInt;

         // ESTRUCTURA CONDICIONAL
         //Si el usuario introduce una clave o mensaje vacíos se repite el bucle.
         if ((clave === "")) {
             alert("Error: La clave no puede estar vacía.");
             valoresCorrectos = false;
         } else if ((mensaje === "")) {
             alert("Error: Debes introducir un mensaje.");
             valoresCorrectos = false;
         } else {
             document.write (`El mensaje introducido es: ${mensaje}.<br>`);
             document.write (`La clave introducida es: ${clave}.<br><br>`);
             valoresCorrectos = true;
         }
     }
 } while (!valoresCorrectos);

 // MODIFICACIÓN DE LA CLAVE CON BUCLE FOR
 /* Se recorre el mensaje con un bucle for y se repite cada letra de la clave según la longitud del mensaje.
 Para ello, se va sumando a la clave (mediante charAt) el resto del caracter actual entre la logitud de la clave.
 De esta forma, si el índice actual se encuentra en la misma posición que el último caracter el resto será 0
 y no se suma ningún caracter más.*/
 for (let i = 0; i < mensaje.length; i++) {
     claveRepetida += clave.charAt(i % clave.length);
 }

 document.write(`La clave final es: ${claveRepetida.toUpperCase()}<br>`);

 // ENCRIPTACIÓN DEL MENSAJE CON BUCLE FOR
 /*De nuevo se recorre el mensaje con un bucle for y se asigna a cada varible creada el caracter actual de cada cadena mediante charAt(),
 tanto del mensaje como de la clave. Una vez hecho se pasa cada cadena a carácteres unicode (ASCII) mediante charCodeAt() y se almacena
 su valor en varibles*/
 for (let i = 0; i < mensaje.length; i++) {
     let mensajeChar = mensaje.charAt(i);
     let claveChar = claveRepetida.charAt(i);

     mensajeCodigo = mensajeChar.charCodeAt(0);
     claveCodigo = claveChar.charCodeAt(0);
     
     // ESTRUCTURA CONDICIONAL
     /*Si el mensaje contiene caracteres entre la A y la Z (incluyendo mayúsculas y minúsculas) y espacios en blanco entonces se realiza
     la operación solicitada y se almacena en una varible con los resultados encriptados. Cualquier otro tipo de caracter no sufrirá ninguna modificación.*/
     if ((mensajeChar >= 'A' && mensajeChar <= 'Z') || (mensajeChar >= 'a' && mensajeChar <= 'z') || (mensajeChar === ' ')) {
         operacion = ((mensajeCodigo + claveCodigo) % 26) + 65;
         mensajeEncriptado += String.fromCharCode(operacion);
     } else {
         mensajeEncriptado += mensajeChar;
     }
 }

 // Salida de resultado
 document.write (`El mensaje encriptado es ${mensajeEncriptado}.`);