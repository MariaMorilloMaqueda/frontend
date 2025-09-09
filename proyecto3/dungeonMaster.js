// Se importa la clase Jugador para permitir usarla en esta clase.
import { Jugador } from './jugador.js';

// Se extiende la clase Jugador, necesario al ser clase padre de DungeonMaster.
export class DungeonMaster extends Jugador {

    // DECLARACIÓN DE VARIABLES
    #_reglas;
    
    // CONSTRUCTOR
    // Se declaran con super las propiedades de la clase padre.
    constructor(nombre, edad, contacto) {
        super(nombre, edad, contacto);
        this.#_reglas = new Set();
    }

    // MÉTODO ADDREGLAS
    /* Si la regla añadida es un tipo string se realiza la acción (sino, devolverá false):
    se añade la regla con el método add y se compara el tamaño inicial del conjunto
    con el tamaño tras añadir la regla. Devolverá true.*/
    addReglas(regla) {
        let resultado;
        if (typeof regla === 'string') {
            resultado = this.#_reglas.size < this.#_reglas.add(regla.toUpperCase()).size;
        } else  {
            resultado = false;
        }
        return resultado;
    }

    // MÉTODO DELREGLAS
    /* Si la regla a eliminar se encuentra en el conjunto se realiza la acción (sino, devolverá false):
    Se elimina la regla con el método delete. Devolverá true.*/
    delReglas(regla) {
        let resultado;
        if (this.#_reglas.has(regla.toUpperCase())) {
            resultado = this.#_reglas.delete(regla.toUpperCase());
        } else {
            resultado = false;
        }
        return resultado;
    }

    // MÉTODO TOSTRING
    // Se reutiliza el toString de la clase padre declarandolo con super.
    // Mediante un array y el método join se pueden añadir varias reglas que quedará separas por coma.
    toString() {
        return super.toString() + " Puede ser máster de " + Array.from(this.#_reglas).join(', ') + ".";
    }
}
