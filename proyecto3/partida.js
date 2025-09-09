// Se importan la clases Jugador, DungeonMaster y Personajes para permitir usarlas en esta clase.
import { Jugador } from './jugador.js';
import { DungeonMaster } from './dungeonMaster.js';
import { Personaje } from './personaje.js';

export class Partida {

  // DECLARACIÓN DE VARIABLES
  #_nombre;
  #_reglas;
  #_dungeonMaster;
  #_participantes;
  #_personajes;
  #_mapaParticipantePersonaje;

  // CONSTRUCTOR
  constructor(nombre, reglas, dungeonMaster) {
    this.nombre = nombre;
    this.reglas = reglas;
    this.dungeonMaster = dungeonMaster;
    this.#_participantes = [];
    this.#_personajes = [];
    this.#_mapaParticipantePersonaje = new Map();
  }

  // MÉTODO ADDJUGADOR
  addJugador(jugador, personaje) {
    let resultado;
    // Si el jugador y el personaje añadidos son instancias de las clases jugador y personaje respectivamente se realiza la acción:
    if (jugador instanceof Jugador && personaje instanceof Personaje) {

      /* Si el jugador no está incluido en la clase jugador y el personaje no está incluido en la clase
      personaje se procede a añadirlos con el método push para los array y el método set para del mapa.*/
      if (!this.#_participantes.includes(jugador) && !this.#_personajes.includes(personaje)) {

        this.#_participantes.push(jugador);
        this.#_personajes.push(personaje);
        this.#_mapaParticipantePersonaje.set(jugador, personaje);

      //Si se han realizado todas las acciones se devolverá true, sino será false.
      resultado = true;
      }
    } else {
      resultado = false;
    }
    return resultado;
  }

  // MÉTODO DELJUGADOR
  delJugador(nombreDelJugador) {
    let resultado;
    // Buscamos el índice del jugador en el array de participantes.
    for (let i = 0; i < this.#_participantes.length; i++) {
      /* Si en la búsqueda el nombre de algún jugador coincide con el nombre introducido
      se elimina el jugador del mapa y también del array participantes*/
        if (this.#_participantes[i].nombre.includes(nombreDelJugador)) {
          
            this.#_mapaParticipantePersonaje.delete(this.#_participantes[i]);
            this.#_participantes.splice(i, 1);

            // Se realiza una segunda búsqueda para eliminar el personaje asociado al jugador del array de personajes.
            for (let j = 0; j < this.#_personajes.length; j++) {
              /*Si alguno de los personajes coincide con los personajes asociados en el mapa con el jugador
              eliminado se procede a eliminar dicho personaje de array.*/
                if (this.#_personajes[j] === this.#_mapaParticipantePersonaje.get(this.#_participantes[i])) {
                    this.#_personajes.splice(j, 1);
                    j = this.#_personajes.length;
                }
            }
            //Si se han realizado todas las acciones se devolverá true, sino será false.
            resultado = true;
        } else {
          resultado = false;
        }
    }
    return resultado;
  }

  // MÉTODO LISTADOJUGADORES
  /*Retorna la lista de los jugadores mediante el método map, que crea un nuevo array a partir del array participantes.
  Se transforma cada elemento en el valor de la propiedad "nombre" de forma que devuelve sólo los nomnbres de lso jugadores.
  - Se hace uso de función flecha para evitar el uso de return.
  - Se ordejan los nombres alfabéticamente con el método sort.
  - Se combinan todos los elementos del array en un único string separados por coma.*/
  listadoJugadores() {
    return this.#_participantes.map(jugador => jugador.nombre).sort().join(", ");
  }

  // MÉTODO LISTADOPERSONAJES
  listadoPersonajes(raza) {
    // Se crea un array para almacenar los personajes que coinciden con la raza seleccionada
    let personajesPorRaza = [];

    // Se recorre el array de personajes
    for (let i = 0; i < this.#_personajes.length; i++) {
      let personaje = this.#_personajes[i];

      // Si la raza del personaje coincide, se agregan los elementos del personaje al array mediante el método push.
      if (personaje.raza === raza) {
        personajesPorRaza.push(
          "Nombre: " +
            personaje.nombre +
            ", Raza: " +
            personaje.raza +
            ", Nivel: " +
            personaje.nivel +
            ", Vida: " +
            personaje.vida +
            ", Fuerza: " +
            personaje.fuerza +
            ", Magia: " +
            personaje.magia +
            ", Destreza: " +
            personaje.destreza +
            ".<br>"
        );
      }
    }
    //Se combinan todos los elementos del array en un único string separados por saltos de línea.
    return personajesPorRaza.join("\n");
  }
  
  // MÉTODO LISTADOPERSONAJES
  listadoPersonajesMaxNivel() {
    let maxNivel = 0; // Se declara una variable para almacenar el nivel-
    let personajesMaxNivel = []; // Se crea un array para almacenar los personajes con máximo nivel.

    // Se recorren el array de personajes para determinar el nivel más alto.
    for (let i = 0; i < this.#_personajes.length; i++) {
      if (this.#_personajes[i].nivel > maxNivel) {
        maxNivel = this.#_personajes[i].nivel;
      }
    }

    // Una vez obtenido el máximo nivel y almacenado en la variable, se buscan personajes del jugador con dicho nivel.
    // Para ello se recorro de nuevo el array personajes.
    // Si hay algun personaje cuyo nivel sea igual que el máximo se agregan los elementos del personaje al array mediante el método push.
    for (let i = 0; i < this.#_personajes.length; i++) {
      if (this.#_personajes[i].nivel === maxNivel) {
        personajesMaxNivel.push(
          "Nombre: " +
            this.#_personajes[i].nombre +
            ", Raza: " +
            this.#_personajes[i].raza +
            ", Nivel: " +
            this.#_personajes[i].nivel +
            ", Vida: " +
            this.#_personajes[i].vida +
            ", Fuerza: " +
            this.#_personajes[i].fuerza +
            ", Magia: " +
            this.#_personajes[i].magia +
            ", Destreza: " +
            this.#_personajes[i].destreza  +
            ".<br>"
        );
      }
    }
     //Se combinan todos los elementos del array en un único string separados por saltos de línea.
    return personajesMaxNivel.join("\n");
  }

  // SETTERS
  // Se captan las excepciones:
  // Si el nombre introducido para la partida tiene menos de 3 caracteres salta la excepción.
  set nombre(nuevoNombre) {
    if (nuevoNombre.length < 3) {
      throw "El nombre debe tener al menos 3 caracteres.";
    } else {
      this.#_nombre = nuevoNombre;
    }
  }

  // Método set sin expceciones para aceder a la propiedad regla
  set reglas (nuevasReglas) {
    this.#_reglas = nuevasReglas;
  }

  // Si se intenta introducir un Máster que no sea objeto perteneciente a la clase DungeonMaster salta la excepción.
  set dungeonMaster(nuevoDungeonMaster) {
    if (!(nuevoDungeonMaster instanceof DungeonMaster)) {
      throw "El máster debe estar creado previamente.";
    } else {
      this.#_dungeonMaster = nuevoDungeonMaster;
    }
  }


  // GETTERS
  get nombre() {
    return this.#_nombre;
  }

  get reglas() {
    return this.#_reglas;
  }

  get dungeonMaster() {
    return this.#_dungeonMaster;
  }

  // MÉTODO DE FORMATEO
  // Se crea una tabla con propiedades HTML
  #_formateaInfo() {
    let tabla = "<table border='1'><tr><th>Jugador</th><th>Personaje</th><th>Raza</th><th>Nivel</th><th>Vida</th><th>Fuerza</th><th>Magia</th><th>Destreza</th></tr>";

    // Los datos de la tabla se rellenan mediante un bucle for con el que se recorre el array participantes.
    // Se asigna a dos variables creadas el array participate y el mapa de participantes y sus personajes.
    // Se rellena la tabla con dichas varabiles y las propiedades del array y del mapa.
    for (let i = 0; i < this.#_participantes.length; i++) {
        let jugador = this.#_participantes[i];
        let personaje = this.#_mapaParticipantePersonaje.get(jugador);

        tabla += "<tr>" + 
        "<td>" + jugador.nombre + " </td> " +
        "<td>" + personaje.nombre + " </td> " +
        "<td>" + String(personaje.raza) + " </td> " +
        "<td>" + String(personaje.nivel) + " </td> " +
        "<td>" + String(personaje.vida) + " </td> " +
        "<td>" + String(personaje.fuerza) + " </td> " +
        "<td>" + String(personaje.magia) + " </td> " +
        "<td>" + String(personaje.destreza) + "</td>" +
        "</tr>";

    }
    tabla += "</table>";
    return tabla;
  }

  // MÉTODO TOSTRING
  toString () {
    return this.#_formateaInfo();
  }
}
