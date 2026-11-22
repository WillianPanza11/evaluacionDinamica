// Pruebas automatizadas de calcularTotal(precio, cantidad, descuento).
// Cada prueba corresponde a un caso de docs/matriz-casos.md.
const { calcularTotal } = require("../src/compras");

describe("RF-01: subtotal = precio x cantidad", () => {
    test("CP-01: calcula el subtotal sin descuento", () => {
        expect(calcularTotal(25.5, 4, 0)).toBe(102);
    });

    test("CP-17: precio 0 produce total 0 (supuesto SP-01)", () => {
        expect(calcularTotal(0, 5, 10)).toBe(0);
    });
});

describe("RF-02: descuento de 0 a 100 %", () => {
    test("CP-02: aplica un descuento del 10 %", () => {
        expect(calcularTotal(100, 2, 10)).toBe(180);
    });

    test("CP-03: límite inferior, descuento 0 %", () => {
        expect(calcularTotal(80, 1, 0)).toBe(80);
    });

    test("CP-04: límite superior, descuento 100 % produce 0", () => {
        expect(calcularTotal(80, 3, 100)).toBe(0);
    });
});

describe("RF-03: total con dos decimales", () => {
    test("CP-05: redondea un resultado con más de dos decimales", () => {
        expect(calcularTotal(19.99, 1, 15)).toBe(16.99);
    });

    test("CP-06: corrige la imprecisión de punto flotante", () => {
        expect(calcularTotal(0.1, 3, 0)).toBe(0.3);
    });
});

describe("RF-04: RangeError para valores fuera de rango", () => {
    test("CP-07: precio negativo", () => {
        expect(() => calcularTotal(-0.01, 1, 0)).toThrow(RangeError);
    });

    test("CP-08: cantidad igual a 0", () => {
        expect(() => calcularTotal(100, 0, 10)).toThrow(RangeError);
    });

    test("CP-09: cantidad negativa", () => {
        expect(() => calcularTotal(100, -1, 10)).toThrow(RangeError);
    });

    test("CP-10: descuento menor que 0", () => {
        expect(() => calcularTotal(100, 1, -0.01)).toThrow(RangeError);
    });

    test("CP-11: descuento mayor que 100", () => {
        expect(() => calcularTotal(100, 1, 100.01)).toThrow(RangeError);
    });
});

describe("RF-05: TypeError para entradas no numéricas o no finitas", () => {
    test("CP-12: precio como texto", () => {
        expect(() => calcularTotal("100", 2, 10)).toThrow(TypeError);
    });

    test("CP-13: cantidad null", () => {
        expect(() => calcularTotal(100, null, 10)).toThrow(TypeError);
    });

    test("CP-14: descuento undefined", () => {
        expect(() => calcularTotal(100, 2, undefined)).toThrow(TypeError);
    });

    test("CP-15: precio NaN", () => {
        expect(() => calcularTotal(NaN, 2, 10)).toThrow(TypeError);
    });

    test("CP-16: precio Infinity", () => {
        expect(() => calcularTotal(Infinity, 2, 10)).toThrow(TypeError);
    });
});