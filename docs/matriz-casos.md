# Matriz de casos de prueba — `calcularTotal`

Los datos se indican en el orden `(precio, cantidad, descuento)`.
Los resultados esperados se definieron a partir de los requisitos antes de ejecutar y no se modifican.

Técnicas: **PE** = partición de equivalencia · **VL** = análisis de valores límite · **DI** = dato inválido por tipo.

## 1. Particiones identificadas

| Parámetro | Clases válidas | Clases inválidas |
|---|---|---|
| `precio` | Número finito ≥ 0 | Negativo (RF-04); no numérico o no finito (RF-05) |
| `cantidad` | Número finito > 0 | ≤ 0 (RF-04); no numérico o no finito (RF-05) |
| `descuento` | Número finito de 0 a 100 | < 0 o > 100 (RF-04); no numérico o no finito (RF-05) |

## 2. Casos de prueba

| ID | Requisito | Técnica | Datos | Resultado esperado | Prioridad | Estado |
|----|-----------|---------|-------|--------------------|-----------|--------|
| CP-01 | RF-01 | PE válida | `(25.5, 4, 0)` | `102` | Alta | Diseñado |
| CP-02 | RF-02 | PE válida | `(100, 2, 10)` | `180` | Alta | Diseñado |
| CP-03 | RF-02 | VL: descuento mínimo | `(80, 1, 0)` | `80` | Media | Diseñado |
| CP-04 | RF-02, RF-03 | VL: descuento máximo | `(80, 3, 100)` | `0` | Alta | Diseñado |
| CP-05 | RF-03 | PE válida, resultado con más de dos decimales | `(19.99, 1, 15)` | `16.99` | Alta | Diseñado |
| CP-06 | RF-03 | PE válida, imprecisión de punto flotante | `(0.1, 3, 0)` | `0.3` | Media | Diseñado |
| CP-07 | RF-04 | VL: precio bajo el mínimo | `(-0.01, 1, 0)` | Lanza `RangeError` | Alta | Diseñado |
| CP-08 | RF-04 | VL: cantidad en el límite inválido | `(100, 0, 10)` | Lanza `RangeError` | Alta | Diseñado |
| CP-09 | RF-04 | PE inválida: cantidad negativa | `(100, -1, 10)` | Lanza `RangeError` | Media | Diseñado |
| CP-10 | RF-04 | VL: descuento bajo el mínimo | `(100, 1, -0.01)` | Lanza `RangeError` | Alta | Diseñado |
| CP-11 | RF-04 | VL: descuento sobre el máximo | `(100, 1, 100.01)` | Lanza `RangeError` | Alta | Diseñado |
| CP-12 | RF-05 | DI: texto numérico | `("100", 2, 10)` | Lanza `TypeError` | Alta | Diseñado |
| CP-13 | RF-05 | DI: `null` | `(100, null, 10)` | Lanza `TypeError` | Media | Diseñado |
| CP-14 | RF-05 | DI: `undefined` | `(100, 2, undefined)` | Lanza `TypeError` | Media | Diseñado |
| CP-15 | RF-05 | DI: `NaN` | `(NaN, 2, 10)` | Lanza `TypeError` | Media | Diseñado |
| CP-16 | RF-05 | DI: no finito | `(Infinity, 2, 10)` | Lanza `TypeError` | Media | Diseñado |
| CP-17 | RF-01 (supuesto SP-01) | VL: precio mínimo válido | `(0, 5, 10)` | `0` | Baja | Diseñado |
| CP-18 | RNF-01 | Exploratoria | 100 000 llamadas con `(19.99, 3, 15)` | Se registra el tiempo; sin umbral de aprobación | Baja | Diseñado |

CP-01 a CP-17 se automatizan en `tests/compras.test.js`. CP-18 es una medición manual (Fase D).

## 3. Cobertura por requisito

| Requisito | Casos | Cantidad |
|-----------|-------|----------|
| RF-01 | CP-01, CP-17 | 2 |
| RF-02 | CP-02, CP-03, CP-04 | 3 |
| RF-03 | CP-04, CP-05, CP-06 | 3 |
| RF-04 | CP-07 a CP-11 | 5 |
| RF-05 | CP-12 a CP-16 | 5 |
| RNF-01 | CP-18 | 1 |

La prioridad se deriva de los riesgos del plan: los casos que cubren RP-01, RP-02 y RP-03 (total negativo, compras inválidas y entradas no numéricas) son de prioridad alta en sus valores límite.