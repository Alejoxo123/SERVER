"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Ingreso = connection_1.default.define('ingresos', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    codigo_producto: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    proveedor_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    fecha_ingreso: {
        type: sequelize_1.DataTypes.DATEONLY,
    }
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = Ingreso;
