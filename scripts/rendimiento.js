// Medición exploratoria de rendimiento de calcularTotal (RNF-01, caso CP-18).
// No es una prueba de carga: mide el tiempo de cálculo en una sola máquina.
const os = require("os");
const { performance } = require("perf_hooks");
const { calcularTotal } = require("../src/compras");

const LLAMADAS = 100000; // llamadas por ronda
const RONDAS = 5;        // rondas medidas
const DATOS = [19.99, 3, 15];

// Calentamiento: el motor de JavaScript optimiza la función después de
// ejecutarla varias veces; sin esto, la primera ronda sale más lenta.
for (let i = 0; i < LLAMADAS; i++) {
    calcularTotal(...DATOS);
}

const tiempos = [];
let control = 0; // evita que el motor descarte llamadas cuyo resultado no se usa
for (let r = 0; r < RONDAS; r++) {
    const inicio = performance.now();
    for (let i = 0; i < LLAMADAS; i++) {
        control += calcularTotal(...DATOS);
    }
    tiempos.push(performance.now() - inicio);
}

const ordenados = [...tiempos].sort((a, b) => a - b);
const mediana = ordenados[Math.floor(RONDAS / 2)];
const promedioPorLlamada = (mediana * 1e6) / LLAMADAS; // nanosegundos

console.log("Medición exploratoria de rendimiento - calcularTotal (CP-18)");
console.log("------------------------------------------------------------");
console.log(`Fecha:          ${new Date().toISOString()}`);
console.log(`Sistema:        ${os.type()} ${os.release()} (${os.arch()})`);
console.log(`Procesador:     ${os.cpus()[0].model} (${os.cpus().length} núcleos lógicos)`);
console.log(`Memoria:        ${(os.totalmem() / 1024 ** 3).toFixed(1)} GB`);
console.log(`Node.js:        ${process.version}`);
console.log(`Datos:          calcularTotal(${DATOS.join(", ")})`);
console.log(`Carga:          ${RONDAS} rondas de ${LLAMADAS} llamadas, tras 1 ronda de calentamiento`);
console.log("");
tiempos.forEach((t, i) => console.log(`Ronda ${i + 1}:        ${t.toFixed(2)} ms`));
console.log("");
console.log(`Mínimo:         ${ordenados[0].toFixed(2)} ms`);
console.log(`Mediana:        ${mediana.toFixed(2)} ms por ${LLAMADAS} llamadas`);
console.log(`Máximo:         ${ordenados[RONDAS - 1].toFixed(2)} ms`);
console.log(`Por llamada:    ${promedioPorLlamada.toFixed(1)} ns (según la mediana)`);
console.log(`Control:        ${control.toFixed(2)}`);