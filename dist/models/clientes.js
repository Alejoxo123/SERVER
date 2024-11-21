"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Cliente = connection_1.default.define('clientes', {
    idclientes: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    documento_identidad: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING(20),
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING(255),
    }
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = Cliente;
