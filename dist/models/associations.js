"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupAssociations;
const ventas_1 = __importDefault(require("../models/ventas"));
const detalles_venta_1 = __importDefault(require("../models/detalles_venta"));
// Asociación Venta -> Detalle
ventas_1.default.hasMany(detalles_venta_1.default, {
    foreignKey: 'venta_id',
    as: 'detalles',
});
// Asociación Detalle -> Venta
detalles_venta_1.default.belongsTo(ventas_1.default, {
    foreignKey: 'venta_id',
    as: 'venta',
});
function setupAssociations() {
    // Este archivo solo importa y ejecuta las asociaciones
}
