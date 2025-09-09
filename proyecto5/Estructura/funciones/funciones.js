// FUNCIÓN IMAGENES
function imagenes(cantidad, contenedor) {
    for (let i = 1; i <= cantidad; i++) {
        // Crear elemento <img>
        let imagen = document.createElement("img"); // De esta forma se crea un elemento de tipo imagen <img>
        
        imagen.src = `../imagenes/im${i}.png`; // Se utiliza para establecer el atributo src del elemento imagen creado.
        imagen.alt = `Imagen ${i}`; // En este caso, tambien se ha incluido un atributo alt.

        imagen.addEventListener("click", function() { // Se emplea el evento "click" para añadir las imagenes al lienzo.
            let lienzo = document.getElementById("lienzo"); // Se obtiene la zona del lienzo mediante ID.
            let copia = document.createElement("img"); // La imagen se crea al igual que se ha hecho al cargar la página.
            copia.src = imagen.src;
            copia.alt = imagen.alt;

            // Con la estructura .style se puede dar estética al elemento creado (con css).
            // position: absolute, top: 0 y left: 0 colocan el elemento en la esquina superior izquierda del lienzo.
            copia.style.position = "absolute";
            copia.style.top = "0";
            copia.style.left = "0";
            copia.style.cursor = "pointer"; // Cambia la apariencia del cursos cuando pasa sobre el elemento.
            copia.style.width = "200px";
            copia.style.height = "auto";
            copia.style.margin = "2px";

            // Se añade la fucionalidad de movimiento con la función creada.
            moverImagen(copia);

            copia.addEventListener("contextmenu", function(e) { // Para usar el formumlario y los radios con el botón derecho se utiliza el evento "contextmenu".
                e.preventDefault();

                // Acceso al formulario y sus radios (nodos) mediante ID y referencia de los elementos hijos.
                let formulario = document.getElementById("formulario");
                let disminuir = formulario.elements["eventos"][0];
                let aumentar = formulario.elements["eventos"][1];
                let borrar = formulario.elements["eventos"][2];

                // Según el radio que esté seleccionado se aplicará la función disminuir, aumentar o se borrará el elemento copia.
                if (disminuir.checked) {
                    disminuirTamanio(copia);
                } else if (aumentar.checked) {
                    aumentarTamanio(copia);
                } else if (borrar.checked) {
                    copia.parentNode.removeChild(copia);
                }
            });
            
            // Agrega la copia al lienzo
            lienzo.appendChild(copia); // Se inserta el elemento "copia" como hijo de "lienzo" meiante .appendChild
            traerAlFrente(copia); // La nueva copia siempre está al frente.
        });

        // Agregar la imagen al contenedor (galería)
        contenedor.appendChild(imagen); // Se inserta el elemento "imagen" como hijo de "contenedor" meiante .appendChild
    }
}

// Contador para controlar la altura de capas
let contadorCapas = 1000;

// FUNCIÓN TRAER AL FRENTE
function traerAlFrente(elemento) {
    contadorCapas++; // Incrementa el contador
    elemento.style.zIndex = contadorCapas; // Asigna el nuevo valor del contador a la propiedad CSS z-index del elemento recibido como parámetro.
}

// FUNCIÓN MOVER IMAGEN
function moverImagen(imagen) {
    let mover = false; // Se crea una variable buleana para iniciar el estado del movimiento como false.
    
     imagen.addEventListener("mousedown", function (e) { // Se utiliza el evento "mousedown" para alternar el estado del movimiento (clica una vez y clica otra para soltar el elemento).
        if (e.button === 0) { // Este condicional indica que se ha pulsado el botón izquierdo del ratón.
            mover = !mover; // Si es así, el estado pasará de false a true, permitiendo mover el elemento.
            traerAlFrente(imagen); // Se aplica la función traerAlFrente al pulsar el elemento.
        }
    });

    document.addEventListener("mousemove", function (e) { // Para mover la imagen dentro del área del lienzo unicamente se ha empleado el evento "mousemove".
        if (mover) {
            let lienzo = document.getElementById("lienzo"); // De nuevo, se obtiene la zona del lienzo mediante ID.
            let posicion = lienzo.getBoundingClientRect();

            /* De desta forma, se calcula la posición de la imagen:
            e.clientX y e.clientY son las coordenadas del ratón respecto a la imagen.
            posicion.left y posicion.top son las coordenadas del borde superior izquierdo del lienzo.
            Se resta la mitad del ancho/alto de la imagen para que el cursor quede centrado en la imagen al moverla.*/
            let x = e.clientX - posicion.left - imagen.width / 2;
            let y = e.clientY - posicion.top - imagen.height / 2;

            /* Limitar la imagen dentro del lienzo:
            Math.min asegura que la imagen no se salga por la derecha o abajo.
            Math.max asegura que la imagen no se salga por la izquierda o arriba.*/
            x = Math.max(0, Math.min(x, lienzo.clientWidth - imagen.width));
            y = Math.max(0, Math.min(y, lienzo.clientHeight - imagen.height));

            // Nueva posición de la imagen
            imagen.style.left = x + "px";
            imagen.style.top = y + "px";
        }
    });
}

// FUNCIÓN DISMINUIR TAMAÑO
function disminuirTamanio(imagen) {
    let anchoActual = parseInt(imagen.style.width); // Se convierte el ancho de la imagen a entero y se almacena en una variable.
    let nuevoAncho = Math.max(50, anchoActual - 20); // Se restan 20px al ancho actual con cada click y se controla que el ancho nunca sea inferior a 50.
    imagen.style.width = nuevoAncho + "px"; // Se asigna el nuevo valor calculado a la imagen.
    imagen.style.height = "auto"; // El alto se deja automático para que se adapte al ancho de la imagen.
}

function aumentarTamanio(imagen) {
    let anchoActual = parseInt(imagen.style.width); // Se convierte el ancho de la imagen a entero y se almacena en una variable.
    let nuevoAncho = Math.min(400, anchoActual + 20); // Se suman 20px al ancho actual con cada click y se controla que el ancho nunca sea superior a 400.
    imagen.style.width = nuevoAncho + "px"; // Se asigna el nuevo valor calculado a la imagen.
    imagen.style.height = "auto"; // El alto se deja automático para que se adapte al ancho de la imagen.
}

// Mediante el evento 'load' se controla que no se ejecute ninguna instrucción hasta que la página esté cargada (espera la carga del DOM).
window.addEventListener('load', function() {

    // CREACIÓN DE LOS ELEMENTOS HTML, ETIQUETAS Y ATRIBUTOS
    // Primer contenedor: lienzo
    let divLienzo = document.createElement("div");
    divLienzo.id = "lienzo";
    document.body.appendChild(divLienzo);

    // Imagen de fondo
    let imagenFondo = document.createElement("img");
    imagenFondo.src = "../imagenes/fondo.png";
    divLienzo.appendChild(imagenFondo);

    // Segundo contenedor: galería
    let divGaleria = document.createElement("div");
    divGaleria.id = "galeria";
    document.body.appendChild(divGaleria);

    let galeria = document.getElementById("galeria"); // Se obtiene la zona del lienzo mediante ID.
    imagenes(5, galeria); // Llamar a la función con 5 imágenes. Se llama a la función imágenes, que añadirá 5 elementos a la galería.
    document.getElementById("lienzo").style.position = "relative"; // Se obtiene la zona del lienzo mediante ID y se le asigna posición relativa con CSS. Esto es importante para la posición absoluta de las imagenes.

    // Tercer contenedor: botonera
    let divBotones = document.createElement("div");
    divBotones.id = "botones";
    document.body.appendChild(divBotones);
    
    // Formulario
    let form = document.createElement("form");
    form.name = "formulario";
    form.id = "formulario";
    divBotones.appendChild(form);

    // Primer radio: Disminuir tamaño
    let inputDisminuir = document.createElement("input");
    inputDisminuir.type = "radio";
    inputDisminuir.name = "eventos";
    inputDisminuir.id = "disminuir";
    inputDisminuir.value = "Disminuir tamaño";

    let labelDisminuir = document.createElement("label");
    labelDisminuir.htmlFor = "disminuir";
    labelDisminuir.textContent = "Disminuir tamaño";

    form.appendChild(inputDisminuir);
    form.appendChild(labelDisminuir);

    // Segundo radio: Aumentar tamaño
    let inputAumentar = document.createElement("input");
    inputAumentar.type = "radio";
    inputAumentar.name = "eventos";
    inputAumentar.id = "aumentar";
    inputAumentar.value = "Aumentar tamaño";

    let labelAumentar = document.createElement("label");
    labelAumentar.htmlFor = "aumentar";
    labelAumentar.textContent = "Aumentar tamaño";

    form.appendChild(inputAumentar);
    form.appendChild(labelAumentar);

    // Tercer radio: Borrar
    let inputBorrar = document.createElement("input");
    inputBorrar.type = "radio";
    inputBorrar.name = "eventos";
    inputBorrar.id = "borrar";
    inputBorrar.value = "Borrar";

    let labelBorrar = document.createElement("label");
    labelBorrar.htmlFor = "borrar";
    labelBorrar.textContent = "Borrar";

    form.appendChild(inputBorrar);
    form.appendChild(labelBorrar);

    // Botón Guardar
    let boton = document.createElement("button");
    boton.type = "button";
    boton.id = "boton1";
    boton.textContent = "Guardar";
    divBotones.appendChild(boton);

    boton.addEventListener("click", function () {
        let lienzo = document.getElementById("lienzo");
    
        // CÓDIGO OPCIONAL - LIBRERÍA CANVAS
        html2canvas(lienzo).then(function(canvas) { // Se utilia evento click
            let enlace = document.createElement("a"); // Se crea un elemento de tipo enlace <a>
            enlace.href = canvas.toDataURL("image/jpeg"); // Se añade al atributo href el tipo de archivo que se va a guardar (en este caso, jpeg)
            enlace.download = "lienzo.jpg"; // Finalmente, se da nombre al archivo a guardar.
            enlace.click();
        });
    });
});

