// DECLARACIÓN DE VARIABLES
let valoresCorrectos = false; // Se utiliza un booleano para salir del bucle.
let fechaEstreno = new Date (1977, 4, 25); // Como los meses empiezan en 0, mayo es el número 4.
let dia, mes, anio, fecha;
let dias, meses, anios;

// MANEJO DE ERRORES CON BUCLE
// El bucle se repite al menos 1 vez o más mientras los valores introducidos sean erróneos.
do {
    // Declaración de variables dentro del bucle
    let diaIntroducido = prompt("Intorduce un día (formato numérico):", "");
    let mesIntroducido = prompt("Intorduce el mes (formato numérico):", "");
    let anioIntroducido = prompt("Intorduce el año (formato numérico):", "");

    // ESTRUCTURA CONDICIONAL
    /*Primero se comprueba si el usuario cancela el algoritno, sino el bucle continúa la ejecución.
    Si el usuario pulsa "cancelar" el valor retornado es null, por lo que se maneja dicho valor en la condición.*/
    if ((diaIntroducido === null) || (mesIntroducido === null) || (anioIntroducido === null)) {
        document.write("El usuario ha cancelado el algoritmo.");
        valoresCorrectos = true;
    } else {
        // Damos los valores que introduce el usuario a las variables establecidas.
        /*Para asegurarnos de que estamos trabajando con números y no con cadenas
        convertimos los números introducidos a enteros con parseInt.*/
        dia = parseInt(diaIntroducido);
        mes = parseInt(mesIntroducido) - 1; // Al número introducido le restamos uno porque los meses comienzan por 0. Si el usuario 5 (mayo) en js será 5-1.
        anio = parseInt(anioIntroducido);

        // ESTRUCTURA CONDICIONAL
        //Si el usuario introduce un valor no numérico o un número negativo o igual a 0 se repite el bucle.
        if ((isNaN(dia)) || (isNaN(mes)) || (isNaN(anio))) {
            alert("Error: Debes introducir un valor numérico.");
            valoresCorrectos = false;
        } else if ((dia <= 0) || (mes <= 0) || (anio <= 0)) {
            alert("Error: Debes introducir un número positivo mayor que 0.");
            valoresCorrectos = false;
        }else {
            fecha = new Date (anio, mes, dia); // Añadimos la fecha ingresada a un objeto Date.

            // VALIDACIÓN DE FECHA
            /*Con una segunda estructura condicional comprobamos que los números introducidos sean fechas correctas:
            los días no serán mayor a 28/29, 30 o 31 (según el mes) y los meses no serán mayor que 12.*/
            if (fecha.getDate() !== dia || fecha.getMonth() !== mes || fecha.getFullYear() !== anio) {
                alert("Error: La fecha introducida no es válida.");
                valoresCorrectos = false;
            } else {
                document.write("La fecha de estreno de Star Wars es: " + fechaEstreno.toLocaleDateString() + "<br>"); // Formateamos la salida al formato español con toLocaleDateString().
                document.write("La fecha introducida es: " + fecha.toLocaleDateString() + "<br><br>"); // Formateamos la salida al formato español con toLocaleDateString().
                valoresCorrectos = true;
            }  
        }
    }
} while (!valoresCorrectos);

// DIFERENCIA DE FECHAS CON CONDICIONAL
/*Se controla mediante una estructura condicional, si la fecha introducida es antes del estreno, después o la misma fecha.
Segun cada posibilidad se hará el cáculo e una forma u otra.*/
if (fecha.getTime() > fechaEstreno.getTime()) {
    // Extraemos el dia, mes y año de la fecha introducida y le restamos los de la fecha de estreno.
    dias = fecha.getDate() - fechaEstreno.getDate();
    meses = fecha.getMonth() - fechaEstreno.getMonth();
    anios = fecha.getFullYear() - fechaEstreno.getFullYear();

    // Hacemos un ajuste en caso de que la diferencia sea negativa.
    if (dias < 0) {
        meses -= 1; // Se debe restar 1 mes ya que el último mes no se completa porque el día es anterior al día del estreno.
        dias += new Date (fecha.getFullYear(), fecha.getMonth(), 0).getDate(); // Se ajusta el valor de los días añadiendo los días del mes anterior.
    }
    
    if (meses < 0) {
        anios -= 1; // Se debe restar 1 año ya que el último año no se completa porque el mes es anterior al mes del estreno.
        meses += 12; // Se ajusta el valor de los meses añadiendo 12 meses ya que se ha restado 1 año.
    }

    // Salida de restulado
    document.write("Han pasado " + dias + " días, " + meses + " meses y " + anios + " años desde la fecha de estreno.");

} else if (fecha.getTime() < fechaEstreno.getTime()) {
    // Extraemos el dia, mes y año de la fecha de estreno y le restamos los de la fecha introducida.
    dias =  fechaEstreno.getDate() - fecha.getDate();
    meses = fechaEstreno.getMonth() - fecha.getMonth();
    anios = fechaEstreno.getFullYear() - fecha.getFullYear();

    // Hacemos un ajuste en caso de que la diferencia sea negativa
    if (dias < 0) {
        meses -= 1; // Se debe restar 1 mes ya que el último mes no se completa porque el día es anterior al día del estreno.
        dias += new Date (fechaEstreno.getFullYear(), fechaEstreno.getMonth(), 0).getDate(); // Se ajusta el valor de los días añadiendo los días del mes anterior.
    }
    
    if (meses < 0) {
        anios -= 1; // Se debe restar 1 año ya que el último año no se completa porque el mes es anterior al mes del estreno.
        meses += 12; // Se ajusta el valor de los meses añadiendo 12 meses ya que se ha restado 1 año.
    }

    // Salida de restulado
    document.write("Faltan " + dias + " días, " + meses + " meses y " + anios + " años para la fecha de estreno.");

} else if (fecha.getTime() === fechaEstreno.getTime()) {
    // Salida de restulado
    document.write("¡Estás en el día del estreno!");
}