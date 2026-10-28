/* =========================================================
   Ejercicio 2. La merienda del Sombrerero Loco
   Estructuras: selección múltiple (switch) + condicional
   ========================================================= */

// Constantes
const TAZAS_MAXIMO = 20;           // máximo de tazas por compra
const TAZAS_DESCUENTO_BAJO = 5;    // desde 5 tazas: 10 %
const TAZAS_DESCUENTO_ALTO = 10;   // desde 10 tazas: 20 %
const DESCUENTO_BAJO = 0.10;
const DESCUENTO_ALTO = 0.20;

// Referencias a elementos de la página
const formMerienda = document.getElementById("formMerienda");
const campoNombre = document.getElementById("nombreInvitado");
const campoBebida = document.getElementById("tipoBebida");
const campoTazas = document.getElementById("cantidadTazas");
const resultadoMerienda = document.getElementById("resultadoMerienda");
const limpiarMerienda = document.getElementById("limpiarMerienda");

// Función propia 1: devuelve el nombre de la bebida según su código (switch)
function obtenerNombreBebida(codigo) {
    let nombre;
    switch (codigo) {
        case "menta":
            nombre = "Té de menta";
            break;
        case "negro":
            nombre = "Té negro";
            break;
        case "cafe":
            nombre = "Café del Conejo";
            break;
        case "chocolate":
            nombre = "Chocolate caliente";
            break;
        case "rosas":
            nombre = "Infusión de rosas";
            break;
        default:
            nombre = "Bebida desconocida";
    }
    return nombre;
}

// Función propia 2: devuelve el precio unitario según el código (switch)
function obtenerPrecioUnitario(codigo) {
    let precio;
    switch (codigo) {
        case "menta":
            precio = 25;
            break;
        case "negro":
            precio = 30;
            break;
        case "cafe":
            precio = 35;
            break;
        case "chocolate":
            precio = 40;
            break;
        case "rosas":
            precio = 45;
            break;
        default:
            precio = 0; // código no válido
    }
    return precio;
}

// Función propia 3: devuelve el porcentaje de descuento según las tazas (if / else if / else)
function obtenerDescuento(tazas) {
    let descuento;
    if (tazas >= TAZAS_DESCUENTO_ALTO) {
        descuento = DESCUENTO_ALTO;
    } else if (tazas >= TAZAS_DESCUENTO_BAJO) {
        descuento = DESCUENTO_BAJO;
    } else {
        descuento = 0;
    }
    return descuento;
}

// Función propia 4: valida los datos y devuelve la lista de errores
function validarDatosMerienda(nombre, codigoBebida, textoTazas) {
    const errores = [];
    const tazas = Number(textoTazas);

    if (nombre.trim() === "") {
        errores.push("El nombre del invitado no puede estar vacío.");
    }

    if (codigoBebida === "") {
        errores.push("Elige una bebida de la lista.");
    }

    if (textoTazas.trim() === "" || Number.isNaN(tazas)) {
        errores.push("Escribe la cantidad de tazas como un número.");
    } else if (!Number.isInteger(tazas)) {
        errores.push("La cantidad de tazas debe ser un número entero.");
    } else if (tazas < 1) {
        errores.push("La cantidad de tazas debe ser positiva (al menos 1).");
    } else if (tazas > TAZAS_MAXIMO) {
        errores.push("El máximo es " + TAZAS_MAXIMO + " tazas por compra.");
    }

    return errores;
}

// Función propia 5: da formato de dinero
function formatoDinero(valor) {
    return "$" + valor.toFixed(2);
}

// Función propia 6: crea un párrafo con texto
function agregarParrafoMerienda(contenedor, texto) {
    const parrafo = document.createElement("p");
    parrafo.textContent = texto;
    contenedor.appendChild(parrafo);
}

// Función propia 7: muestra errores en la página
function mostrarErroresMerienda(errores) {
    resultadoMerienda.textContent = "";

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

    resultadoMerienda.appendChild(caja);
}

// Evento submit del formulario
formMerienda.addEventListener("submit", function (evento) {
    evento.preventDefault(); // evita recargar la página

    // 1. Entrada
    const nombre = campoNombre.value.trim();
    const codigoBebida = campoBebida.value;
    const textoTazas = campoTazas.value;

    // 2. Validación
    const errores = validarDatosMerienda(nombre, codigoBebida, textoTazas);
    if (errores.length > 0) {
        mostrarErroresMerienda(errores);
        return;
    }

    // 3. Procesamiento
    const tazas = Number(textoTazas);
    const nombreBebida = obtenerNombreBebida(codigoBebida);
    const precioUnitario = obtenerPrecioUnitario(codigoBebida);
    const subtotal = precioUnitario * tazas;
    const porcentajeDescuento = obtenerDescuento(tazas);
    const montoDescuento = subtotal * porcentajeDescuento;
    const total = subtotal - montoDescuento;

    // 4. Salida
    resultadoMerienda.textContent = "";

    const caja = document.createElement("div");
    caja.className = "mensaje mensaje-ok";

    const titulo = document.createElement("h3");
    titulo.textContent = "Cuenta de la merienda";
    caja.appendChild(titulo);

    agregarParrafoMerienda(caja, "Invitado: " + nombre);
    agregarParrafoMerienda(caja, "Bebida: " + nombreBebida);
    agregarParrafoMerienda(caja, "Cantidad: " + tazas + " taza(s)");
    agregarParrafoMerienda(caja, "Precio unitario: " + formatoDinero(precioUnitario));
    agregarParrafoMerienda(caja, "Subtotal: " + formatoDinero(subtotal));
    agregarParrafoMerienda(
        caja,
        "Descuento: " + (porcentajeDescuento * 100) + " % (" + formatoDinero(montoDescuento) + ")"
    );
    agregarParrafoMerienda(caja, "Total a pagar: " + formatoDinero(total));

    resultadoMerienda.appendChild(caja);
});

// Al pulsar "Nueva compra" se borra el resultado y se vuelve a usar el mismo formulario
limpiarMerienda.addEventListener("click", function () {
    resultadoMerienda.textContent = "";
});