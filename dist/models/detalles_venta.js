"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Detalle extends sequelize_1.Model {
}
Detalle.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    venta_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ventas',
            key: 'id'
        }
    },
    codigo_producto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nombre_producto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descripcion_producto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    precio_unitario: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    subtotal: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
}, {
    timestamps: false,
    sequelize: connection_1.default,
    modelName: 'Detalle',
    tableName: 'detalle_venta',
});
exports.default = Detalle;
