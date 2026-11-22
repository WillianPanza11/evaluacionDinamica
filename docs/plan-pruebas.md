# Plan de pruebas — Módulo de cálculo de compras

Objeto de prueba: función `calcularTotal(precio, cantidad, descuento)` en `src/compras.js`.
Base de prueba: requisitos RF-01 a RF-05 y RNF-01.
Responsable: Willian Panza.

## 1. Alcance

**Incluido:** cálculo del subtotal (RF-01), descuento de 0 a 100 % (RF-02), total con dos decimales (RF-03), `RangeError` por valores fuera de rango (RF-04), `TypeError` por entradas no numéricas o no finitas (RF-05) y una medición exploratoria de rendimiento (RNF-01).

**Excluido:** interfaz, base de datos y pagos; pruebas de integración, sistema y aceptación; seguridad y usabilidad. El módulo es una función aislada y no hay requisitos sobre esos aspectos.

## 2. Riesgos

| ID | Riesgo | Prob. | Impacto | Respuesta en las pruebas |
|---|---|---|---|---|
| RP-01 | Total negativo por aceptar descuentos fuera de 0–100. | Alta | Alto | Valores límite: −0,01; 0; 100; 100,01. |
| RP-02 | Se aceptan precios negativos o cantidades ≤ 0. | Alta | Alto | Casos negativos en 0 y bajo 0. |
| RP-03 | Una entrada no numérica produce `NaN` en lugar de un error. | Alta | Alto | Texto, `null`, `undefined`, `NaN`, `Infinity`. |
| RP-04 | Total con más de dos decimales. | Media | Medio | Casos con resultado no exacto. |
| RP-05 | Una corrección rompe un cálculo que funcionaba. | Media | Alto | Regresión: reejecutar toda la suite. |

Riesgo del proyecto: ajustar una prueba o un requisito para que pase. Para evitarlo, los resultados esperados se fijan en la matriz antes de ejecutar y no se modifican.

## 3. Niveles, tipos y técnicas

| Decisión | Selección | Justificación |
|---|---|---|
| Nivel | Unidad | Es una función aislada, sin dependencias. |
| Tipos | Funcional (casos positivos, negativos y de borde), rendimiento exploratorio y regresión | RF-01 a RF-05, RNF-01 y verificación tras cada corrección. |
| Técnicas | Partición de equivalencia, análisis de valores límite y datos inválidos por tipo | Caja negra: los casos se derivan de los requisitos, no del código. |

## 4. Ambiente

| Elemento | Detalle |
|---|---|
| Sistema operativo | Windows 11 25H2|
| Ejecución | Node.js v20.19.4 |
| Herramienta | Jest, versión fijada en `package-lock.json` |
| Comando | `npm test` (script `jest --runInBand`) |
| Datos | Definidos en `docs/matriz-casos.md`; sin datos reales |

## 5. Criterios de entrada y salida

**Entrada:**

- Requisitos disponibles y código inicial sin modificar.
- Matriz con al menos 12 casos y su resultado esperado definido.
- `npm install` y `npm test` se ejecutan sin errores de configuración.

**Salida:**

- Al menos 10 casos automatizados, ejecutados sobre el código inicial y el corregido.
- Todos los casos de prioridad alta aprobados y ningún defecto de severidad alta abierto.
- Al menos tres defectos registrados con evidencia.
- Cada requisito RF-01 a RF-05 cubierto por al menos un caso aprobado.
- Evidencias inicial y final guardadas, y riesgos residuales documentados.

## 6. Supuestos

| ID | Supuesto |
|---|---|
| SP-01 | Un precio igual a 0 es válido y produce total 0 (RF-04 solo rechaza el negativo). |
| SP-02 | El total se devuelve como número, no como texto. |
| SP-03 | Si hay un error de tipo y otro de rango a la vez, se lanza `TypeError`. |
| SP-04 | No se prueban cantidades decimales; queda como riesgo residual. |
