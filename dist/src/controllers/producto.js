"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.putProduct = exports.postProduct = exports.deleteProduct = exports.getProduct = exports.getProducts = void 0;
const producto_1 = __importDefault(require("../models/producto"));
const sequelize_1 = require("sequelize");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ListProducts = yield producto_1.default.findAll();
    res.json({ ListProducts });
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield producto_1.default.findByPk(id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
});
exports.getProduct = getProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield producto_1.default.findByPk(id);
    if (!product) {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
    else {
        yield product.destroy();
        res.json({ msg: 'Producto eliminado con exito' });
    }
});
exports.deleteProduct = deleteProduct;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield producto_1.default.create(body);
        res.json({
            msg: 'Producto creado con exito'
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Error al crear producto, comuniquese con soporte',
        });
    }
});
exports.postProduct = postProduct;
const putProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const product = yield producto_1.default.findByPk(id);
    try {
        if (product) {
            yield product.update(body);
            res.json({
                msg: 'Producto actualizado con exito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Error al actualizar producto, comuniquese con soporte'
        });
    }
});
exports.putProduct = putProduct;
const searchProductsByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query; // El nombre se enviará como parte de los parámetros de consulta (?name=producto)
    // Verificar que se haya proporcionado un nombre
    if (!name || typeof name !== 'string') {
        return res.status(400).json({
            msg: 'El parámetro "name" es obligatorio y debe ser una cadena de caracteres.'
        });
    }
    try {
        // Eliminar espacios en blanco
        const productName = name.trim();
        // Buscar productos que contengan el nombre proporcionado
        const products = yield producto_1.default.findAll({
            where: {
                name: {
                    [sequelize_1.Op.like]: `%${productName}%`
                }
            }
        });
        if (products.length > 0) {
            return res.json({ products });
        }
        else {
            return res.status(404).json({
                msg: `No se encontraron productos con el nombre: ${productName}`
            });
        }
    }
    catch (error) {
        console.error('Error en la búsqueda:', error); // Para ayudarte a depurar
        return res.status(500).json({
            msg: 'Error en la búsqueda, por favor contacte a soporte',
        });
    }
});
exports.searchProductsByName = searchProductsByName;
