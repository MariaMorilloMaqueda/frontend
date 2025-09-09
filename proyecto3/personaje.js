export class Personaje {

    // DECLARACIÓN DE VARIABLES
    /* Como el array razas debe ser constante y no puede cambiar se declara static para que pertenezca a la clase y no a las instancias
    individuales, ya que no tiene sentido que cada instancia de la clase tenga su propia copia del array si este no puede ser modificado.*/
    #_nombre;
    static #_razas = Object.freeze(['humano', 'orco', 'elfo', 'enano', 'troll']); 
    #_raza;
    #_nivel;
    #_vida;
    #_fuerza;
    #_magia;
    #_destreza;

    // CONSTRUCTOR
    /* Se relizan dentro del constructor aquellas excepciones que implican más de una propiedad:
    - Si la suma de magia y fuerza es superior a 50 salta la excepción.
    - Si la suma de vida, fuerza, magia y destreza es superior a 60 salta la excepción.*/
    constructor(nombre, raza, nivel, vida, fuerza, magia, destreza) {
        if (magia + fuerza > 50 ) {
            throw "La suma entre magia y fuerza no puede ser superior a 50.";
        } else if (vida  + fuerza + magia + destreza > 60) {
            throw "Los personajes no pueden sobrepasar el total 60 entre vida, fuerza, magia y destreza.";
        }
        this.nombre = nombre;
        this.raza = raza;
        this.nivel = nivel;
        this.vida = vida;
        this.fuerza = fuerza;
        this.magia = magia;
        this.destreza = destreza;
    }

    // SETTERS
    // Se captan las excepciones:
    // Si el nombre introducido para el personaje tiene menos de 5 caracteres salta la excepción.
    set nombre (nuevoNombre) {
        if (nuevoNombre.length < 5) {
            throw  "El nombre no puede tener menos de 5 caracteres.";
        } else {
            this.#_nombre = nuevoNombre;
        }
    }

    // Si la raza introducida no se encuentra dentro del array razas sata la excepción.
    set raza (nuevaRaza) {
        if (!Personaje.#_razas.includes(nuevaRaza.toLowerCase())) {
            throw "La raza debe ser humano, orco, elfo, enano o troll.";
        } else {
            this.#_raza = nuevaRaza.toLowerCase();
        }
    }

    // Si el nivel introducido no es un número entero mayor de 1 y menor de 65 salta la excepción.
    set nivel (nuevoNivel) {
        if (isNaN(nuevoNivel) || !Number.isInteger(nuevoNivel) || nuevoNivel <= 1 || nuevoNivel >= 65) {
            throw  "El nivel debe ser un número entero al menos mayor de 1 e inferior a 65.";
        } else {
            this.#_nivel = nuevoNivel;
        }
    }

    // Si el número de vidas introducido no es un número mayor de 0 y menor de 31 salta la excepción.
    // Como no se especifica, se permiten decimales.
    set vida (nuevaVida) {
        if (isNaN(nuevaVida) || nuevaVida < 1 || nuevaVida > 30) {
            throw  "El número de vidas debe estar comprendido entre 1 y 30";
        } else {
            this.#_vida = nuevaVida;
        }
    }

    // Si el número de vidas introducido no es un número mayor de 0 y menor de 31 salta la excepción.
    // Como no se especifica, se permiten decimales.
    set fuerza (nuevaFuerza) {
        if (isNaN(nuevaFuerza) || nuevaFuerza < 1 || nuevaFuerza > 30) {
            throw  "El nivel de fuerza debe ser al menos 1 y máximo 30.";
        } else {
            this.#_fuerza = nuevaFuerza;
        }
    }

    // Si nivel de magia introducido no es un número de al menos 0 y menor de 31 salta la excepción.
    // Como no se especifica, se permiten decimales.
    set magia (nuevaMagia) {
        if (isNaN(nuevaMagia) || nuevaMagia < 0 || nuevaMagia > 30) {
            throw  "El nivel de magia debe estar comprendido entre 0 y 30.";
        } else {
            this.#_magia = nuevaMagia;
        }
    }

    // Si nivel de destreza introducido no es un número mayor de 0 y menor de 31 salta la excepción.
    // Como no se especifica, se permiten decimales.
    set destreza (nuevaDestreza) {
        if (isNaN(nuevaDestreza) || nuevaDestreza < 1 || nuevaDestreza > 30) {
            throw  "El nivel de destreza debe estar comprendido entre 1 y 30.";
        } else {
            this.#_destreza = nuevaDestreza;
        }
    }

    // GETTERS
    get nombre() {
        return this.#_nombre;
    }

    get raza() {
        return this.#_raza;
    }

    get nivel() {
        return this.#_nivel;
    }

    get vida() {
        return this.#_vida;
    }

    get fuerza() {
        return this.#_fuerza;
    }

    get magia() {
        return this.#_magia;
    }

    get destreza() {
        return this.#_destreza;
    }

    // MÉTODO TOSTRING
    toString() {
        return this.nombre + "  es un " + this.raza + " con " + this.nivel + " de nivel, " + this.vida + " de vida, "
        + this.fuerza + " de fuerza, " + this.magia + " de magia y " + this.destreza + " de destreza.";
    }
}