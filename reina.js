/* =========================================================
   Ejercicio 3. El desafío de la Reina de Corazones
   Estructuras: repetitiva (for) + condicional
   ========================================================= */

// Constantes
const CARTAS_MINIMO = 1;
const CARTAS_MAXIMO = 100;

// Referencias a elementos de la página
const formReina = document.getElementById("formReina");
const campoCartas = document.getElementById("cantidadCartas");
const resultadoReina = document.getElementById("resultadoReina");
const limpiarReina = document.getElementById("limpiarReina");

// Función propia 1: valida el valor ingresado y devuelve la lista de errores
function validarCartas(textoCartas) {
    const errores = [];
    const cartas = Number(textoCartas);

    if (textoCartas.trim() === "" || Number.isNaN(cartas)) {
        errores.push("Escribe la cantidad de cartas como un número.");
    } else if (!Number.isInteger(cartas)) {
        errores.push("La cantidad de cartas debe ser un número entero.");
    } else if (cartas < CARTAS_MINIMO) {
        errores.push("La cantidad de cartas debe ser positiva (al menos " + CARTAS_MINIMO + ").");
    } else if (cartas > CARTAS_MAXIMO) {
        errores.push("El máximo es " + CARTAS_MAXIMO + " cartas.");
    }

    return errores;
}

// Función propia 2: recorre del 1 al total con for y devuelve un objeto con los resultados
function analizarCartas(totalCartas) {
    let cantidadPares = 0;
    let cantidadImpares = 0;
    let sumaPares = 0;
    let sumaImpares = 0;
    const cartas = []; // guarda cada número y si es par o impar

    for (let numero = 1; numero <= totalCartas; numero++) {
        if (numero % 2 === 0) {
            cantidadPares++;
            sumaPares += numero;
            cartas.push({ numero: numero, esPar: true });
        } else {
            cantidadImpares++;
            sumaImpares += numero;
            cartas.push({ numero: numero, esPar: false });
        }
    }

    return {
        cartas: cartas,
        cantidadPares: cantidadPares,
        cantidadImpares: cantidadImpares,
        sumaPares: sumaPares,
        sumaImpares: sumaImpares
    };
}

// Función propia 3: decide qué grupo tiene la mayor suma (o empate)
function grupoMayorSuma(sumaPares, sumaImpares) {
    let texto;
    if (sumaPares > sumaImpares) {
        texto = "Los PARES tienen la mayor suma.";
    } else if (sumaImpares > sumaPares) {
        texto = "Los IMPARES tienen la mayor suma.";
    } else {
        texto = "¡Empate! Ambos grupos suman lo mismo.";
    }
    return texto;
}

// Función propia 4: crea un párrafo con texto
function agregarParrafoReina(contenedor, texto) {
    const parrafo = document.createElement("p");
    parrafo.textContent = texto;
    contenedor.appendChild(parrafo);
}

// Función propia 5: muestra errores en la página
function mostrarErroresReina(errores) {
    resultadoReina.textContent = "";

    const caja = document.createElement("div");
    caja.className = "mensaje mensaje-error";
    caja.setAttribute("role", "alert");

    const titulo = document.createElement("h3");
    titulo.textContent = "¡La Reina exige datos correctos!";
    caja.appendChild(titulo);

    const lista = document.createElement("ul");
    for (let i = 0; i < errores.length; i++) {
        const item = document.createElement("li");
        item.textContent = errores[i];
        lista.appendChild(item);
    }
    caja.appendChild(lista);

    resultadoReina.appendChild(caja);
}

// Evento submit del formulario
formReina.addEventListener("submit", function (evento) {
    evento.preventDefault(); // evita recargar la página

    // 1. Entrada
    const textoCartas = campoCartas.value;

    // 2. Validación
    const errores = validarCartas(textoCartas);
    if (errores.length > 0) {
        mostrarErroresReina(errores);
        return;
    }

    // 3. Procesamiento
    const totalCartas = Number(textoCartas);
    const analisis = analizarCartas(totalCartas);
    const veredicto = grupoMayorSuma(analisis.sumaPares, analisis.sumaImpares);

    // 4. Salida
    resultadoReina.textContent = "";

    const caja = document.createElement("div");
    caja.className = "mensaje mensaje-ok";

    const titulo = document.createElement("h3");
    titulo.textContent = "Veredicto de la Reina";
    caja.appendChild(titulo);

    // Secuencia: cada carta es un <span> con clase de par o impar
    agregarParrafoReina(caja, "Secuencia de cartas (rojo = par, morado = impar):");
    const secuencia = document.createElement("div");
    secuencia.className = "secuencia";
    for (let i = 0; i < analisis.cartas.length; i++) {
        const carta = document.createElement("span");
        carta.className = analisis.cartas[i].esPar ? "carta carta-par" : "carta carta-impar";
        carta.textContent = analisis.cartas[i].numero;
        secuencia.appendChild(carta);
    }
    caja.appendChild(secuencia);

    agregarParrafoReina(caja, "Cantidad de pares: " + analisis.cantidadPares + " | Suma de pares: " + analisis.sumaPares);
    agregarParrafoReina(caja, "Cantidad de impares: " + analisis.cantidadImpares + " | Suma de impares: " + analisis.sumaImpares);
    agregarParrafoReina(caja, veredicto);

    resultadoReina.appendChild(caja);
});

// Al pulsar "Repetir" se borra el resultado para empezar otro desafío
limpiarReina.addEventListener("click", function () {
    resultadoReina.textContent = "";
});