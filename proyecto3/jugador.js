export class Jugador {

    // DECLARACIÓN DE VARIABLES
    #_nombre;
    #_edad;
    #_contacto;
    
    // CONSTRUCTOR
    constructor(nombre, edad, contacto) {
        this.nombre = nombre;
        this.edad = edad;
        this.contacto = contacto;
    }

    // SETTERS
    // Se captan las excepciones:
    // Si el nombre introducido para el jugador tiene menos de 5 caracteres salta la excepción.
    set nombre (nuevoNombre) {
        if (nuevoNombre.length < 5) {
            throw  "El nombre no puede tener menos de 5 caracteres.";
        } else {
            this.#_nombre = nuevoNombre;
        }
    }

    // Si la edad introducida no es un número entero mayor de 12 y menor de 85 salta la excepción.
    set edad (nuevaEdad) {
        if (isNaN(nuevaEdad) || !Number.isInteger(nuevaEdad) || nuevaEdad <= 12 || nuevaEdad >= 85) {
            throw  "Los jugadores deben tener al menos más de 12 años y menos de 85.";
        } else {
            this.#_edad = nuevaEdad;
        }
    }

    // Si el contacto introducido no tiene al menos 5 caracteres o supera los 100 salta la excepción.
    set contacto (nuevoContacto) {
        if (nuevoContacto.length < 5 || nuevoContacto.length > 100) {
            throw  "Introduce un teléfono o correo de al menos 5 caracteres y no superar los 100.";
        } else {
            this.#_contacto = nuevoContacto;
        }
    }

    // GETTERS
    get nombre() {
        return this.#_nombre;
    }

    get edad() {
        return this.#_edad;
    }

    get contacto() {
        return this.#_contacto;
    }

    // MÉTODO TOSTRING
    toString() {
        return this.nombre + "  tiene " + this.edad + " años y su contacto es " + this.contacto + ".";
    }
}
