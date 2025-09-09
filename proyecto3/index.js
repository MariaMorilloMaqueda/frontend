// Se importan las clases creadas para permitir usarlas en este código.
import { Jugador } from './jugador.js';
import { DungeonMaster } from './dungeonMaster.js';
import { Personaje } from './personaje.js';
import { Partida } from './partida.js';

//DECLARACIÓN DE VARIABLES
// Creación de variables que almacenan las salidas por pantallas.
let salida = document.getElementById("salida");
let salidaErrores = document.getElementById("errores");
let jugador1, jugador2, jugador3, jugador4;
let master1, master2, master3;
let personaje1, personaje2, personaje3, personaje4, personaje5, personaje6, personaje7, personaje8, personaje9, personaje10;
let partida1, partida2;

let jugadorA, jugadorB, jugadorC;
let masterA, masterB;
let personajeA, personajeB, personajeC, personajeD, personajeE, personajeF, personajeG, personajeH, personajeI;

// La creación de objetos se realiza dentro de la función uso()
export function uso() {
    try {
        salida.innerHTML = "Información de la partida:<br><br>";

        // CREACIÓN DE 4 JUGADORES
        jugador1 = new Jugador ("Elena Losada", 40, "654 435 567");
        salida.innerHTML += "Jugadores creados:<br>" + jugador1.toString() + "<br>";
        jugador2 = new Jugador ("Paula Carrión", 27, "paulaca@gmail.com");
        salida.innerHTML += jugador2.toString() + "<br>";
        jugador3 = new Jugador ("Francisco Sánchez", 26, "654 857 774");
        salida.innerHTML += jugador3.toString() + "<br>";
        jugador4 = new Jugador ("Antonio Márquez", 31, "antonio93@hotmail.com");
        salida.innerHTML += jugador4.toString() + "<br><br>";
    } catch (e) {
        console.error("Error.  " + e);
    }

    try {
        // CREACIÓN DE 3 MÁSTERS
        master1 = new DungeonMaster ("María Morillo", 29, "mariabmdh@gmail.com");
        master2 = new DungeonMaster ("Jose Luis Mendoza", 84, "655 488 521");
        master3 = new DungeonMaster ("Carmen Domínguez", 13, "654 225 118");

        // AÑADIR Y ELIMINAR REGLAS (con pruebas no válidas).
        master1.addReglas("d20");
        master1.delReglas("d20"); //Elimina 1 regla.
        //master1.delReglas("d20"); //Se intenta eliminar una regla inexistente.
        master1.addReglas("ts");
        master2.addReglas("cthulhu");
        //master2.addReglas("Cthulhu"); //Se intenta añadir una regla que ya existe.
        master3.addReglas("d100");
        master3.addReglas("d20");

        salida.innerHTML += "DungeonMasters creados:<br>" + master1.toString() + "<br>";
        salida.innerHTML += master2.toString() + "<br>";
        salida.innerHTML += master3.toString() + "<br><br>";
    } catch (e) {
        console.error("Error.  " + e);
    }

    try {
        // CREACIÓN DE 10 PERSONAJES
        personaje1 = new Personaje ("Hermione Granger", "Humano", 10, 15, 20, 10, 10);
        salida.innerHTML += "Personajes creados:<br>" + personaje1.toString() + "<br>";
        personaje2 = new Personaje ("Dobby", "Elfo", 12, 25.5, 20.09, 5.6, 5.1);
        salida.innerHTML += personaje2.toString() + "<br>";
        personaje3 = new Personaje ("Griphook", "Enano", 20, 20, 15, 10, 5);
        salida.innerHTML += personaje3.toString() + "<br>";
        personaje4 = new Personaje ("Mocoso", "Troll", 30, 18, 15, 10, 12);
        salida.innerHTML += personaje4.toString() + "<br>";
        personaje5 = new Personaje ("Garona", "Orco",  15, 10, 25, 5, 5);
        salida.innerHTML += personaje5.toString() + "<br>";
        personaje6 = new Personaje ("Eowyn", "Humano", 8, 12, 15, 15, 8);
        salida.innerHTML += personaje6.toString() + "<br>";
        personaje7 = new Personaje ("Legolas", "Elfo", 18, 17, 18, 5, 10);
        salida.innerHTML += personaje7.toString() + "<br>";
        personaje8 = new Personaje ("Tyrion Lannister", "Enano", 25, 16, 20, 5, 8);
        salida.innerHTML += personaje8.toString() + "<br>";
        personaje9 = new Personaje ("Poppy", "Troll", 25, 14, 15, 10, 9);
        salida.innerHTML += personaje9.toString() + "<br>";
        personaje10 = new Personaje ("Lurtz", "Orco", 32, 15, 30, 0, 10);
        salida.innerHTML += personaje10.toString() + "<br><br>";
    } catch (e) {
        console.error("Error.  " + e);
    }

    try {
        // CREACIÓN DE PARTIDAS
        partida1 = new Partida ("La Maldición del Oráculo", "D100", master1);
        
        // AÑADIR Y ELIMINAR PERSONAJES (con pruebas no válidas)
        partida1.addJugador(jugador1, personaje1);
        //partida1.addJugador(jugador1, personaje1); //Se intenta añadir un jugador y personaje existentes.
        partida1.addJugador(jugador2, personaje2);
        partida1.addJugador(jugador3, personaje3);
        partida1.addJugador(jugador4, personaje10);
        partida1.delJugador("Elena Losada"); //Elimina 1 jugador.
        //partida1.delJugador("Rosario Maqueda"); //Se intenta eliminar un jugador inexistente.

        salida.innerHTML += partida1.toString() + "<br>Partida creada correctamente.<br><br>";
        
        partida2 = new Partida ("Bajo las Estrellas Caídas", "CTHULHU", master3);
        partida2.addJugador(jugador1, personaje5);
        partida2.addJugador(jugador2, personaje7);
        partida2.addJugador(jugador3, personaje8);
        partida2.addJugador(jugador4, personaje9);

        salida.innerHTML += partida2.toString() + "<br>Partida creada correctamente.<br><br>";

        // LISTADOS CREADOS
        salida.innerHTML += "Listado de jugadores (partida 1): <br>" + partida1.listadoJugadores() + ".<br><br>";
        salida.innerHTML += "Listado de personajes por raza (partida 2): <br>" + partida2.listadoPersonajes("orco") + "<br>";
        salida.innerHTML += "Listado de personajes con máximo nivel (partida 3): <br>" + partida2.listadoPersonajesMaxNivel() + "<br>";

    } catch (e) {
        console.error("Error.  " + e);
    }

    // Pruebas con error
    /*try {
        //jugadorA = new Jugador ("Elen", 40, "654 435 567");
        //jugadorB = new Jugador ("Paula Carrión", 11, "paulaca@gmail.com");
        //jugadorC = new Jugador ("Francisco Sánchez", 26, "no");

        //masterA = new Jugador ("María Morillo", 29, "Este es un contacto no válido. Este es un contacto no válido. Este es un contacto no válido. Este es un contacto no válido.");
        //masterB = new Jugador ("Jose Luis Mendoza", 85, "655 488 521");

        //personajeA = new Personaje ("Hermione Granger", "Humano", 10, 15, 30, 30, 10);
        //personajeB = new Personaje ("Dobby", "Elfo", 12, 15, 15, 15, 16);
        //personajeC = new Personaje ("Griphook", "hobbit", 20, 20, 15, 10, 5);
        //personajeD = new Personaje ("Moco", "Troll", 30, 18, 15, 10, 12);
        //personajeE = new Personaje ("Garona", "Orco",  1, 10, 25, 5, 5);
        //personajeF = new Personaje ("Eowyn", "Humano", 8, 31, 8, 8, 8);
        //personajeG = new Personaje ("Legolas", "Elfo", 18, 17, 0, 5, 10);
        //personajeH = new Personaje ("Tyrion Lannister", "Enano", 25, 1, 1, 31, 8);
        //personajeI = new Personaje ("Lurtz", "Orco", 32, 15, 30, 0, 0);

    } catch (e) {
        console.error("Error.  " + e); //El error se muestra tanto en consola como por pantalla.
        salidaErrores.innerHTML = "Error: " + e;
    }*/
}