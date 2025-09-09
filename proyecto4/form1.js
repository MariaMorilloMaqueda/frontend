window.addEventListener('load',iniciar, false);

function iniciar()
{
	enviar.addEventListener('click',validar);

	let elemento = document.getElementsByTagName("input");
	for (let i = 0; i < elemento.length; i++) {
		if (elemento[i].type === "text" || elemento[i].type === "password") {
			elemento[i].addEventListener("focus", eventos);
			elemento[i].addEventListener("blur", eventos);
		}
	}

	// Mostrar contraseña repetida:
	document.getElementById("mostrarRepeticion").addEventListener("click", function() {
		let mostrarContrasenia = document.getElementById("repeticion");
		if (mostrarContrasenia.type === "password") {
			mostrarContrasenia.type = "text";
			this.innerText = "Ocultar";
		} else {
			mostrarContrasenia.type = "password";
			this.innerText = "Mostrar";
		}
	});
}

function validar(eventopordefecto){
	let devolver=""; 
	resultado.innerHTML="";

	if (validarcampostexto(this) & validarNombre() & validarCodigo() & validarContrasenia() & validarGenero() && confirm("¿Deseas enviar el formulario?")) {	
	    eventopordefecto.preventDefault();

         let nombre = document.getElementById("nombre").value;
         let codigo = document.getElementById("codigo").value;
         let contrasenia = document.getElementById("contrasenia").value;
         let genero = document.getElementById("genero").value || "No especificado";
 
         resultado.innerHTML = "Nombre: " + nombre + ".<br>"
         + "Código: " + codigo + ".<br>"
		 + "Contraseña: " + contrasenia + ".<br>"
         + "Género: " + genero + ".<br>";

		devolver=true;
		console.log(eventopordefecto);
		console.log(eventopordefecto.target);
    }
	else
	{
		eventopordefecto.preventDefault();		
		devolver=false;
	}
	return(devolver);
}

function validarcampostexto(objeto)
{
	let devolver=true;
	let formulario = objeto.form;

	for (let i=0; i<formulario.elements.length; i++)
	{
		formulario.elements[i].className="";        
	}
	
	for (let i=0; i<formulario.elements.length; i++)
	{
		if (formulario.elements[i].type == "text" && formulario.elements[i].id !== "genero" && formulario.elements[i].value=="")
		{
			resultado.innerHTML+="El campo " + formulario.elements[i].name + " no puede estar en blanco.<br>";
			formulario.elements[i].className = "error";
			formulario.elements[i].focus();
			devolver=false;
		}
	}
	return devolver;
}

/*Expresión regular para validar el nombre:
^ --> indica el inicio de la cadena.
(?=.{10,45}$) --> Lookahead positivo que indica que la cadena debe tener entre 10 y 45 caracteres.
[A-Za-zñçÑÇ]+ --> Representa una primera palabra compuesta por letras mayúsculas y minúscilas incluyendo ñ, ç, Ñ y Ç.
\s+ --> representa 1 o más espacios en blanco.
[A-Za-zñçÑÇ]+ -->  Representa una segunda palabra compuesta por letras mayúsculas y minúscilas incluyendo ñ, ç, Ñ y Ç.
$ --> indica el final de la cadena
*/
function validarNombre()
{
	// O: patron = /(?=^[A-Za-zÑñÇç]+\s+[A-Za-zÑñÇç]+$)(?=^.{10,45}$)/;
	const patron = /^(?=.{10,45}$)[A-Za-zñçÑÇ]+\s+[A-Za-zñçÑÇ]+$/;
	let devolver = true;

	if (patron.test(document.getElementById("nombre").value))
	{
		document.getElementById("nombre").className="correcto";	
		devolver=true;
	}
	else
	{
		resultado.innerHTML+="El campo nombre no es correcto. Debe estar compuesto por entre 10 y 45 carácteres alfabéticos (incluyendo ñ y ç), sin acentos y uno o más espacios.<br>";
		
		document.getElementById("nombre").focus();
		document.getElementById("nombre").className="error";	
		devolver=false;
	}
	return (devolver);
}

/*Expresión regular para validar el código:
^ --> indica el inicio de la cadena.
\d{3} --> \d representa un digito numérico (0-9) y {3} indica que deben ser 3 dígitos.
[B-DF-HJ-NP-TV-Z]{2} --> Representa un conjunto de caracteres que incluye solo letras mayúsculas, excluyendo las vocales (A, E, I, O, U). {2} indica que deben ser 2 caracteres.
$ --> indica el final de la cadena
*/
function validarCodigo()
{
	// O: patron = /^\d{3}[B-DF-HJ-NP-TV-ZÑÇ]{2}$/;
	const patron = /^\d{3}[B-DF-HJ-NP-TV-Z]{2}$/;
	let devolver=true;

	if (patron.test(document.getElementById("codigo").value))
	{
		document.getElementById("codigo").className="correcto";	
		devolver=true;
	}
	else
	{
		resultado.innerHTML+="El campo codigo no es correcto. Debe estar compuesto por tres números y dos letras mayúsculas (sin incluir vocales).<br>";
		
		document.getElementById("codigo").focus();
		document.getElementById("codigo").className="error";	
		devolver=false;
	}
	return (devolver);
}

/*Expresión regular para validar la contraseña:
^ --> indica el inicio de la cadena.
*/
function validarContrasenia()
{
	// O: /(?=^[A-ZÑÇ])(?=.*[a-zñç])(?=^\D*\d\D*\d?\D*\d?\D*$)(?!.*[fF][rR][oO][mM])(?!.*[iI][nN][sS][eE][rR][tT])(?!.*[dD][eE][lL][eE][tT][eE])(?=^[^\.]*\.[^\.]*$)(?=.*,\^$)(?=^.{9,21}$)/;
	const patron = /(?=^[A-ZÑÇ])(?=.*[a-zñç])(?=^\D\d\D*\d?\D*\d?\D*$)(?!.*insert)(?!.*delete)(?!.*from)(?=^[^\.]*\.[^\.]*$)(^.{7,19},\^$)/;
	let devolver=true;

	if (patron.test(document.getElementById("contrasenia").value))
	{
		document.getElementById("contrasenia").className="correcto";	
		devolver=true;
	}
	else
	{
		resultado.innerHTML+="El campo contraseña no es correcto.<br>";
		
		document.getElementById("contrasenia").focus();
		document.getElementById("contrasenia").className="error";	
		devolver=false;
	}
	return (devolver);
}

function validarGenero()
{
	const patron = /^[A-Za-z\s]*$/;
    let opcionesDatalist = document.getElementById("generos").options;
	let devolver=true;
    let opcionValida = false;

    for (let i = 0; i < opcionesDatalist.length; i++) {
        if (document.getElementById("genero").value === opcionesDatalist[i].value) {
            opcionValida = true;
        }
    }

	if (document.getElementById("genero").value === "" || patron.test(document.getElementById("genero").value) || opcionValida)
	{
		document.getElementById("genero").className="correcto";	
		devolver=true;
	}
	else
	{
		resultado.innerHTML+="El campo genero no es correcto. Puede estar vacío, seleccionar una opción o contener carácteres alfabétcos y espacios en blanco.<br>";
		
		document.getElementById("genero").focus();
		document.getElementById("genero").className="error";	
		devolver=false;
	}
	return (devolver);
}

function eventos(evento) {
	let id = evento.target.id;
	let elemento = document.getElementById(id);

	if (id != null && elemento.value.length > 0) {
		if (evento.type === "focus") {
			elemento.dataset.originalValue = elemento.value;
			elemento.value = elemento.value.slice(0, -1) + elemento.value.slice(-1).toUpperCase();
		} else if (evento.type === "blur") {
			if (elemento.dataset.originalValue) {
				elemento.value = elemento.dataset.originalValue;
			}
		}
	}
}