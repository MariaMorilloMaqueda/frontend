$(function () {
    
    const MICLAVE = "03a7ddffe25d4adcb76102601251605"; //Clave personal obtenida al registrarse en la página de weatherapi

    $("#boton1").click(function (evt) {

        evt.preventDefault(); // Previene la acción por defecto (por ejemplo, que un formulario se envíe y recargue la página).
        
        $("#resultado").html("<img src='ajax-loader.gif'>"); // Mientras se carga aparecerá un gif animado

        let ciudad = $("#ciudad").val().trim(); // Se obtiene el valor del input introducido por el usuario y se almacena en una variable

        if (!ciudad.includes(",")) { // Si la ciudad/pueblo introducido no contiene ",es" para indicar que pertenece a españa, se añade
            ciudad += ",es";
        }

        // Primera consulta con fetch
        fetch("https://api.weatherapi.com/v1/current.json?key=" + MICLAVE + "&q=" + ciudad + "&aqi=yes&lang=ES") // Se añade lang=ES para que los resultados sean en español. No obstante, la API weather no traduce región y pais, sólo los datos meteorlógicos.
        .then((result) => {
                return result.json();
            }).then((datos) => {
                $("#resultado").html("<br/>"); // Se quita el gif animado
                let html = "<h3>Datos de " + datos.location.name + "</h3>";
                html += "<p>Región: " + datos.location.region + ". País: " +  datos.location.country + ".</p>";

                html += "<p>Temperatura actual: " + datos.current.temp_c + " °C</p>";

                // Mostrar viento si existe
                if (datos.current.wind_kph > 0) {
                    html += "<p>Viento: " + datos.current.wind_kph + " km/h. Dirección: " + datos.current.wind_dir + "</p>";
                }

                html += "<p>Estado: " + datos.current.condition.text + "</p>";
                html += "<img src=\"https:" + datos.current.condition.icon + "\"/>";

                if (datos.current.precip_mm > 0) {
                    html += "<p>Lluvia: " + datos.current.precip_mm + "mm</p>";
                }

                let calidad = datos.current.air_quality;
                html += "<p>Calidad del aire</p>";
                html += "<ul>" +
                    "<li>CO (Monóxido de carbono): " + calidad.co.toFixed(2) + "</li>" + // Para todos los parámetros se redondea el resultado a 2 decimales con .toFixed()
                    "<li>NO₂ (Dióxido de nitrógeno): " + calidad.no2.toFixed(2) + "</li>" +
                    "<li>PM2.5: " + calidad.pm2_5.toFixed(2) + "</li>" +
                    "<li>PM10: " + calidad.pm10.toFixed(2) + "</li>" +
                "</ul>";

                $("#resultado").html(html); // Se imprime el resultado obtenido
            }).catch(error => {
                let mensaje = "Error: no se puede obtener la información."; // Se ha añadido un mensaje para el usuario en caso de error.
                
                if (error.message) { // Si el error tiene información adicional, la mostramos.
                    mensaje += error.message;
                }
                $("#resultado").html("<p class='error'>" + mensaje + "</p>"); // Se muestra el error para el usuario
                console.warn(error); // Se muestra el error por cosola
            })
            .finally(() => console.log("La consulta ha finalizado."));
    });

    $("#boton2").click(function (evt) {

         evt.preventDefault(); // Previene la acción por defecto (por ejemplo, que un formulario se envíe y recargue la página).

         $("#resultado2").html("<img src='ajax-loader.gif'>"); // Mientras se carga aparecerá un gif animado

         let ciudad = $("#ciudad").val().trim(); // Se obtiene el valor del input introducido por el usuario y se almacena en una variable

        if (!ciudad.includes(",")) { // Si la ciudad/pueblo introducido no contiene ",es" para indicar que pertenece a españa, se añade
            ciudad += ",es";
        }

        // Segunda consulta con axios
        axios({
            method: "get", // Tipo de consulta: GET
            url: "https://api.weatherapi.com/v1/forecast.json",
            params: {
                key: MICLAVE,
                q: ciudad,
                days: 4, // Importante esta parte: pedimos 4 días para tener 3 futuros (siempre incluye el día actual)
                aqi: "yes",
                alerts: "yes", // Necesario para poder mostrar si hay alertas o no
                lang: "es" // Se añade un parámetro para que los resultados sean en español. No obstante, la API weather no traduce región y pais, sólo los datos meteorlógicos.
            }
        }).then(function (datos) {
            $("#resultado2").html("<br/>"); // Se quita el gif animado

            let html = "<h3>Tiempo para los próximos 3 días en " + datos.data.location.name+ "</h3>";
                html += "<p>Región: " + datos.data.location.region + ". País: " +  datos.data.location.country + ".</p>";
            
            // Se recorre con un bucle for cada parámetro para obtener los resultados de los 3 días
            //for (let i in datos.data.forecast.forecastday) --> es equivalente a esto: 
            for (let i = 1; i < datos.data.forecast.forecastday.length; i++) { //El bucle empieza en 1 porque el 0 corresponde al día actual y no lo queremos
                html += "<div class='dia'>";
                html += "<h4>Fecha: " + datos.data.forecast.forecastday[i].date + "</h4>";
                html += "<p>Máximas: " + datos.data.forecast.forecastday[i].day.maxtemp_c + " °C</p>";
                html += "<p>Mínimas: " + datos.data.forecast.forecastday[i].day.mintemp_c + " °C</p>";
                html += "<img src=\"https:" + datos.data.forecast.forecastday[i].day.condition.icon + "\"/>";
                html += "<p>Salida del sol: " + datos.data.forecast.forecastday[i].astro.sunrise + "</p>";
                html += "<p>Puesta del sol: " + datos.data.forecast.forecastday[i].astro.sunset + " </p>";
                html += "</div><br>";
            }
            
            // Tanto si hay alertas como si no se imprimirá el mensaje correspondiente
            if (datos.data.alerts && datos.data.alerts.alert && datos.data.alerts.alert.length > 0) {
                html += "<p class=\"alerta\"><strong>Hay alertas meteorológicas activas para estos días.</strong></p>";
            } else {
                html += "<p class=\"sin-alerta\">No hay alertas meteorológicas para estos días.</p>";
            }

            $("#resultado2").html(html); // Se imprime el resultado obtenido
        }).catch(error => {
            let mensaje = "Error: no se puede obtener la información."; // Se ha añadido un mensaje para el usuario en caso de error.

            if (error.message) { // Si el error tiene información adicional, la mostramos.
                mensaje += error.message;
            }
            $("#resultado2").html("<p class='error'>" + mensaje + "</p>");  // Se muestra el error para el usuario
            console.warn(error);  // Se muestra el error por cosola
        })
        .finally(() => console.log("La consulta ha finalizado."));
    });

    $("#boton3").click(function (evt) {

        evt.preventDefault(); // Previene la acción por defecto (por ejemplo, que un formulario se envíe y recargue la página).

        $("#resultado3").html("<img src='ajax-loader.gif'>"); // Mientras se carga aparecerá un gif animado

        let ciudad = $("#ciudad").val().trim(); // Se obtiene el valor del input introducido por el usuario y se almacena en una variable

        let url = "http://geodb-free-service.wirefreethought.com/v1/geo/places?limit=5&offset=0&types=CITY&namePrefix=" + ciudad + "&languageCode=es&countryIds=ES";

        // Tercera consulta con ajax
        $.ajax({
            url: url,
            type: "GET", // Tipo de consulta: GET
            dataType: "json",
            async : true,

            success: function(datos) {
                $("#resultado3").html("<br/>"); // Se quita el gif animado

                let html = "<h4>Mapa: </h4>";

                let infoCiudad = datos.data[0]; // Almacenamos en una variable el primer parámetro del array que es el que nos interesa (el de España).
                
                /*Se almacena en una variable las coordenadas de una ciudad (latitud y longitud) para centrar el mapa:
                El parámetro bbox define el área que se mostrará en el mapa (un pequeño rectángulo alrededor de la ciudad).
                El parámetro marker pone un marcador en la ubicación exacta de la ciudad.*/
                let urlMapa = "https://www.openstreetmap.org/export/embed.html?bbox=" +(infoCiudad.longitude-0.05) + "%2C" + (infoCiudad.latitude-0.05) + "%2C" +
                (infoCiudad.longitude+0.05) + "%2C" + (infoCiudad.latitude+0.05) + "&layer=mapnik&marker=" + infoCiudad.latitude + "%2C" + infoCiudad.longitude;

                html += "<div class='mapa'>";
                html += "<iframe width='45%' height='400px' src='" + urlMapa + "'></iframe><br>"; // Se añade el mapa en un iframe
                html += "<a href='https://www.openstreetmap.org/?mlat=" + infoCiudad.latitude + "&mlon=" + infoCiudad.longitude +
                "#map=14/" + infoCiudad.latitude + "/" + infoCiudad.longitude + "' target='_blank'>Ver mapa completo</a>"; // Se añade un enlace para ver el mapa completo
                html += "</div>";

            $("#resultado3").html(html);
            },
            error: function(xhr, estado, error_producido) {
                let mensaje = "Error: no se puede obtener la información."; // Se ha añadido un mensaje para el usuario en caso de error.
                
                if (error_producido) {
                    mensaje += " " + error_producido;
                }
                $("#resultado3").html("<p class='error'>" + mensaje + "</p>"); // Se muestra el error para el usuario
                console.warn("Error producido: " + error_producido); // Se muestra el error por cosola
                console.warn("Estado: " + estado); // Se muestra el estado por consola
                console.warn("Código HTTP:", xhr.status); // <Se muestra el código de estado HTTP por consola
            },
            complete: function(xhr, estado) {
                console.log("La consulta ha finalizado.");
                console.warn("Estado: " + estado);
                console.warn("Código HTTP:", xhr.status);
            }
        });
    });
});