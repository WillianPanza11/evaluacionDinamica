function validarNumero(valor, nombre) {
    if (typeof valor !== "number" || !Number.isFinite(valor)) {
        throw new TypeError(`${nombre} debe ser un número finito`);
    }
}

function redondear2(valor) {
    return Math.round((valor + Number.EPSILON) * 100) / 100;
}

function calcularTotal(precio, cantidad, descuento) {
    // RF-05: primero el tipo (supuesto SP-03)
    validarNumero(precio, "precio");
    validarNumero(cantidad, "cantidad");
    validarNumero(descuento, "descuento");

    // RF-04: después los rangos
    if (precio < 0) {
        throw new RangeError("precio no puede ser negativo");
    }
    if (cantidad <= 0) {
        throw new RangeError("cantidad debe ser mayor que 0");
    }
    if (descuento < 0 || descuento > 100) {
        throw new RangeError("descuento debe estar entre 0 y 100");
    }

    // RF-01 y RF-02: cálculo
    const subtotal = precio * cantidad;
    const valorDescuento = (subtotal * descuento) / 100;

    // RF-03: dos decimales
    return redondear2(subtotal - valorDescuento);
}

module.exports = { calcularTotal };