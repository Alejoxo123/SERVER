"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Categoria = connection_1.default.define('categorias', {
    idcategorias: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(200),
    }
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = Categoria;
