# Reporte de pruebas — Módulo de cálculo de compras

Objeto de prueba: `calcularTotal(precio, cantidad, descuento)` en `src/compras.js`.
Ambiente: Windows [completar versión], Node.js v20.19.4, Jest 30.
Referencias: `docs/plan-pruebas.md`, `docs/matriz-casos.md`, `docs/defectos.md`.

## 1. Resumen

Tras corregir tres defectos, los 17 casos automatizados pasan y los cinco requisitos funcionales quedan cubiertos. La función se considera apta para el uso previsto, con los riesgos residuales de la sección 6.

## 2. Resultados de la ejecución

| Ejecución | Aprobadas | Fallidas | Evidencia |
|---|---|---|---|
| Inicial (código sin corregir) | 5 | 12 | `evidencias/pruebas-iniciales.txt` |
| Final (tras corregir DEF-01 a DEF-03) | 17 | 0 | `evidencias/pruebas-finales.txt` |

Las fallas iniciales se concentraron en RF-03, RF-04 y RF-05: el código calculaba bien, pero no validaba entradas ni redondeaba.

## 3. Defectos

| ID | Descripción | Requisito | Severidad | Estado |
|---|---|---|---|---|
| DEF-01 | No valida que las entradas sean números finitos. | RF-05 | Alta | Cerrado |
| DEF-02 | No valida los rangos de precio, cantidad y descuento. | RF-04 | Alta | Cerrado |
| DEF-03 | El total no se redondea a dos decimales. | RF-03 | Media | Cerrado |

Pasos, resultados esperados y reales, evidencia y regresión de cada corrección: `docs/defectos.md`.

## 4. Cobertura por requisito

| Requisito | Casos | Resultado inicial | Resultado final |
|---|---|---|---|
| RF-01 | CP-01, CP-17 | 2 de 2 aprobados | 2 de 2 aprobados |
| RF-02 | CP-02, CP-03, CP-04 | 3 de 3 aprobados | 3 de 3 aprobados |
| RF-03 | CP-04, CP-05, CP-06 | 1 de 3 aprobados | 3 de 3 aprobados |
| RF-04 | CP-07 a CP-11 | 0 de 5 aprobados | 5 de 5 aprobados |
| RF-05 | CP-12 a CP-16 | 0 de 5 aprobados | 5 de 5 aprobados |
| RNF-01 | CP-18 | No aplica | Medido (sección 5) |

CP-04 aparece en RF-02 y RF-03 porque comprueba a la vez el descuento máximo y que el 100 % produzca 0.

## 5. Medición exploratoria de rendimiento (RNF-01)

**Método:** el script `scripts/rendimiento.js` (`npm run perf`) ejecuta una ronda de calentamiento y luego 5 rondas de 100 000 llamadas con `calcularTotal(19.99, 3, 15)`, midiendo cada ronda con `performance.now()`. Se reporta la mediana porque es menos sensible a una ronda anómala que el promedio.

**Entorno:** [completar con los datos de `evidencias/rendimiento.txt`: sistema, procesador, memoria y versión de Node.js].

| Medida | Valor |
|---|---|
| Mínimo por ronda | 3.76 ms ms |
| Mediana por ronda (100 000 llamadas) | 4.65 ms |
| Máximo por ronda | 5.55 ms |
| Tiempo por llamada | 46.5 ns |

Evidencia: `evidencias/rendimiento.txt`.

**Limitaciones:**

- Es una sola máquina en un momento dado; otros programas abiertos alteran los tiempos, como muestra la diferencia entre rondas.
- Mide solo el cálculo aislado, sin red, interfaz ni base de datos, que en un sistema real dominarían el tiempo de respuesta.
- RNF-01 no fija un umbral, así que el resultado describe el comportamiento observado pero no aprueba ni rechaza nada.
- Usa un único conjunto de datos válidos; no mide el tiempo de los caminos que lanzan errores.

## 6. Riesgos residuales

| ID | Riesgo | Observación | Recomendación |
|---|---|---|---|
| RR-01 | Desbordamiento numérico con valores muy grandes. | En una exploración fuera de la matriz, `calcularTotal(1e308, 2, 0)` devuelve `NaN`: las entradas son válidas según RF-04 y RF-05, pero el subtotal supera el máximo representable. | Definir con negocio un precio y una cantidad máximos. |
| RR-02 | Cantidades decimales aceptadas sin regla. | `calcularTotal(2.5, 1.5, 0)` devuelve `3.75`. Ningún requisito indica si 1,5 unidades es válido (supuesto SP-04). | Confirmar si la cantidad debe ser entera. |
| RR-03 | Precio 0 tratado como válido. | Decisión basada en el supuesto SP-01, no en un requisito explícito. | Confirmar con negocio. |
| RR-04 | Método de redondeo no especificado. | Se redondea la mitad hacia arriba; RF-03 no indica el método (otros sistemas usan redondeo bancario). | Confirmar la regla contable. |
| RR-05 | Orden de validación sin caso propio. | El supuesto SP-03 (tipo antes que rango) está implementado, pero ningún caso lo prueba de forma directa. | Añadir un caso como `("x", -1, 10)` en la siguiente iteración. |

## 7. Criterios de salida

| Criterio del plan | Cumplido |
|---|---|
| Al menos 10 casos automatizados, ejecutados sobre el código inicial y el corregido | Sí (17) |
| Todos los casos de prioridad alta aprobados | Sí |
| Al menos tres defectos registrados con evidencia | Sí (3) |
| Ningún defecto de severidad alta abierto | Sí |
| Cada requisito RF-01 a RF-05 cubierto por al menos un caso aprobado | Sí |
| Evidencias inicial y final guardadas, y riesgos residuales documentados | Sí |
