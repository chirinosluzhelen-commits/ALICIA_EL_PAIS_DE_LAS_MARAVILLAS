/* =========================================================
   Ejercicio 1. La poción mágica de Alicia
   Estructuras: secuencial + condicional (if, else if, else)
   ========================================================= */

// Constantes de la regla (no cambian durante la ejecución)
const ALTURA_PUERTA_CM = 40;      // altura fija de la puerta
const PORCENTAJE_POR_ML = 1;      // cada ml reduce 1 % de la altura inicial
const ALTURA_MIN_CM = 1;
const ALTURA_MAX_CM = 300;
const POCION_MIN_ML = 1;
const POCION_MAX_ML = 95;

// Referencias a elementos de la página
const formPocion = document.getElementById("formPocion");
const campoAltura = document.getElementById("alturaInicial");
const campoPocion = document.getElementById("cantidadPocion");
const resultadoPocion = document.getElementById("resultadoPocion");
const limpiarPocion = document.getElementById("limpiarPocion");

// La altura de la puerta se escribe en la interfaz desde la constante
document.getElementById("alturaPuertaTexto").textContent = ALTURA_PUERTA_CM;

// Función propia 1: aplica la regla matemática y devuelve la nueva altura (cm)
function calcularNuevaAltura(alturaInicial, mlPocion) {
    const reduccion = (alturaInicial * mlPocion * PORCENTAJE_POR_ML) / 100;
    return alturaInicial - reduccion;
}

// Función propia 2: valida los datos y devuelve una lista de errores (vacía si todo está bien)
function validarDatosPocion(textoAltura, textoPocion) {
    const errores = [];
    const altura = Number(textoAltura);
    const pocion = Number(textoPocion);

    // Altura: debe ser número, positivo y estar en el rango permitido
    if (textoAltura.trim() === "" || Number.isNaN(altura)) {
        errores.push("Escribe la altura inicial de Alicia como un número.");
    } else if (altura <= 0) {
        errores.push("La altura debe ser un número positivo (mayor que 0).");
    } else if (altura < ALTURA_MIN_CM || altura > ALTURA_MAX_CM) {
        errores.push("La altura debe estar entre " + ALTURA_MIN_CM + " y " + ALTURA_MAX_CM + " cm.");
    }

    // Poción: debe ser número dentro del rango permitido
    if (textoPocion.trim() === "" || Number.isNaN(pocion)) {
        errores.push("Escribe la cantidad de poción como un número.");
    } else if (pocion < POCION_MIN_ML || pocion > POCION_MAX_ML) {
        errores.push("La poción debe estar entre " + POCION_MIN_ML + " y " + POCION_MAX_ML + " ml.");
    }

    return errores;
}

// Función propia 3: redondea a 2 decimales para mostrar
function redondear(numero) {
    return Math.round(numero * 100) / 100;
}

// Función propia 4: crea un párrafo con texto y lo agrega a un contenedor
function agregarParrafo(contenedor, texto) {
    const parrafo = document.createElement("p");
    parrafo.textContent = texto;
    contenedor.appendChild(parrafo);
}

// Función propia 5: muestra los errores dentro de la página
function mostrarErroresPocion(errores) {
    resultadoPocion.textContent = "";

    const caja = document.createElement("div");
    caja.className = "mensaje mensaje-error";
    caja.setAttribute("role", "alert");

    const titulo = document.createElement("h3");
    titulo.textContent = "Hay que corregir los datos";
    caja.appendChild(titulo);

    const lista = document.createElement("ul");
    for (let i = 0; i < errores.length; i++) {
        const item = document.createElement("li");
        item.textContent = errores[i];
        lista.appendChild(item);
    }
    caja.appendChild(lista);

    resultadoPocion.appendChild(caja);
}

// Función propia 6: muestra el resultado correcto dentro de la página
function mostrarResultadoPocion(clase, alturaInicial, mlPocion, alturaFinal, mensaje) {
    resultadoPocion.textContent = "";

    const caja = document.createElement("div");
    caja.className = "mensaje " + clase;

    const titulo = document.createElement("h3");
    titulo.textContent = "Resultado";
    caja.appendChild(titulo);

    agregarParrafo(caja, "Altura inicial: " + redondear(alturaInicial) + " cm");
    agregarParrafo(caja, "Poción consumida: " + redondear(mlPocion) + " ml");
    agregarParrafo(caja, "Altura final: " + redondear(alturaFinal) + " cm (puerta: " + ALTURA_PUERTA_CM + " cm)");
    agregarParrafo(caja, mensaje);

    resultadoPocion.appendChild(caja);
}

// Evento submit: se ejecuta al enviar el formulario
formPocion.addEventListener("submit", function (evento) {
    evento.preventDefault(); // evita que la página se recargue

    // 1. Entrada: leer valores (siempre llegan como texto)
    const textoAltura = campoAltura.value;
    const textoPocion = campoPocion.value;

    // 2. Validación
    const errores = validarDatosPocion(textoAltura, textoPocion);
    if (errores.length > 0) {
        mostrarErroresPocion(errores);
        return;
    }

    // 3. Conversión de tipo y cálculo
    const alturaInicial = Number(textoAltura);
    const mlPocion = Number(textoPocion);
    const alturaFinal = calcularNuevaAltura(alturaInicial, mlPocion);

    // 4. Comparación con la puerta (if / else if / else)
    let clase;
    let mensaje;
    if (alturaFinal < ALTURA_PUERTA_CM) {
        clase = "mensaje-ok";
        mensaje = "¡Alicia puede pasar! Sobra espacio en la puerta.";
    } else if (alturaFinal === ALTURA_PUERTA_CM) {
        clase = "mensaje-ok";
        mensaje = "¡Alicia puede pasar justo! Mide exactamente lo mismo que la puerta.";
    } else {
        clase = "mensaje-aviso";
        mensaje = "Alicia no puede pasar. Sigue siendo más alta que la puerta; necesita más poción.";
    }

    // 5. Salida en la página
    mostrarResultadoPocion(clase, alturaInicial, mlPocion, alturaFinal, mensaje);
});

// Al pulsar "Limpiar" también se borra el resultado mostrado
limpiarPocion.addEventListener("click", function () {
    resultadoPocion.textContent = "";
});