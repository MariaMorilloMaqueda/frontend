window.addEventListener('load', iniciar);

function iniciar() {
    let descripcion = document.getElementById("descripcion");
    let calificacion = document.getElementById("calificacion");
    let formulario = document.getElementById("formulario");
    let eliminar = document.getElementById("eliminar");

    calificacion.addEventListener("input", function () {
        if (calificacion.validity.valid) {
            descripcion.disabled = false;
        } else {
            descripcion.disabled = true;
        }
    });

    descripcion.addEventListener("input", validarDescripcion);
    formulario.addEventListener("submit", enviar);
    eliminar.addEventListener("click", borrar);

    // Detectar cuando un campo es inválido y aplicar fondo rojo
    descripcion.addEventListener("invalid", function () {
        descripcion.style.backgroundColor = "red";
        contarIntentoFallido();
    });

    calificacion.addEventListener("invalid", function () {
        calificacion.style.backgroundColor = "red";
        contarIntentoFallido();
    });
}

function validarDescripcion() {
    let descripcion = document.getElementById("descripcion");
    if (descripcion.value.trim().length < 5) {
        descripcion.setCustomValidity("La descripción debe tener al menos 5 caracteres.");
    } else {
        descripcion.setCustomValidity("");
    }
}

function borrar() {
    let descripcion = document.getElementById("descripcion");
    let calificacion = document.getElementById("calificacion");
    let peliculas = document.getElementsByName("peliculas");

    // Vaciar campos de texto
    descripcion.value = "";
    calificacion.value = "";

    // Deseleccionar radio buttons
    for (let i = 0; i < peliculas.length; i++) {
        peliculas[i].checked = false;
    }

    // Deshabilitar el campo de descripción
    descripcion.disabled = true;

    // Limpiar mensajes de resultado
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    // Limpiar mensajes de error personalizados
    descripcion.setCustomValidity("");
    calificacion.setCustomValidity("");
}

function contarIntentoFallido() {
    let enviosIncorrectos = localStorage.getItem("enviosIncorrectos");
    if (enviosIncorrectos === null) {
        localStorage.setItem("enviosIncorrectos", "1");
    } else {
        localStorage.setItem("enviosIncorrectos", parseInt(enviosIncorrectos) + 1);
    }
}

function enviar(e) {
    let correcto = true;
    let peliculas = document.getElementsByName("peliculas");
    let descripcion = document.getElementById("descripcion");
    let calificacion = document.getElementById("calificacion");
    let resultado = document.getElementById("resultado");
    let pelicula = "";
    resultado.innerHTML = "";

    formulario.reportValidity();

    if (calificacion.validity.badInput) {
        calificacion.setCustomValidity("Introduce una calificación");
    }

    if (descripcion.validity.customError || calificacion.validity.badInput) {
        e.preventDefault();
        correcto = false;
    }

    for (let i = 0; i < peliculas.length && pelicula === ""; i++) {
        if (peliculas[i].checked) {
            pelicula = peliculas[i].value;
        }
    }

    if (pelicula === "") {
        correcto = false;
    }

    if (!correcto) {
        contarIntentoFallido();
        e.preventDefault();
        return false;
    } else {
        resultado.innerHTML = "Pelicula seleccionada: " + pelicula + ".<br>"
        + "Descripción: " + descripcion.value + ".<br>" 
        + "Calificación: " + calificacion.value + ".<br>";

        descripcion.style.backgroundColor = "green";
        calificacion.style.backgroundColor = "green";
        
        let enviosCorrectos = localStorage.getItem("enviosCorrectos");
        if (enviosCorrectos === null) {
            localStorage.setItem("enviosCorrectos", "1");
        } else {
            localStorage.setItem("enviosCorrectos", parseInt(enviosCorrectos) + 1);
        }

        e.preventDefault();
    }

    let enviosCorrectos = localStorage.getItem("enviosCorrectos") || 0;
    let enviosIncorrectos = localStorage.getItem("enviosIncorrectos") || 0;
    resultado.innerHTML += "Envíos correctos: " + enviosCorrectos + "<br>Envíos incorrectos: " + enviosIncorrectos;

    return correcto;
}