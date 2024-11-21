"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByReferencia = exports.searchProductsByCodigo = exports.searchProductsByName = exports.putProduct = exports.postProducts = exports.deleteProduct = exports.getProduct = exports.getProducts = void 0;
const producto_1 = __importDefault(require("../models/producto"));
const sequelize_1 = require("sequelize");
const getProducts = async (req, res) => {
    const ListProducts = await producto_1.default.findAll();
    res.json({ ListProducts });
};
exports.getProducts = getProducts;
const getProduct = async (req, res) => {
    const { id } = req.params;
    const product = await producto_1.default.findByPk(id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
};
exports.getProduct = getProduct;
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await producto_1.default.findByPk(id);
    if (!product) {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
    else {
        await product.destroy();
        res.json({ msg: 'Producto eliminado con exito' });
    }
};
exports.deleteProduct = deleteProduct;
const postProducts = async (req, res) => {
    const { body } = req;
    if (!Array.isArray(body)) {
        return res.status(400).json({
            msg: 'El cuerpo de la solicitud debe ser un array de productos.',
        });
    }
    const requiredFields = ['codigo', 'name', 'description', 'referencia', 'stock', 'price'];
    const isValid = body.every(product => requiredFields.every(field => field in product));
    if (!isValid) {
        return res.status(400).json({
            msg: 'Todos los productos deben incluir los campos: codigo, referencia, name, description, price, cantidad.',
        });
    }
    try {
        const productCodes = body.map((product) => product.codigo);
        const productReferences = body.map((product) => product.referencia);
        const existingProducts = await producto_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { codigo: productCodes },
                    { referencia: productReferences },
                ],
            },
        });
        const existingCodes = existingProducts.map((product) => product.codigo);
        const existingReferences = existingProducts.map((product) => product.referencia);
        const newProducts = body.filter((product) => !existingCodes.includes(product.codigo) && !existingReferences.includes(product.referencia));
        const updatedProducts = body.filter((product) => existingCodes.includes(product.codigo) || existingReferences.includes(product.referencia));
        if (newProducts.length > 0) {
            await producto_1.default.bulkCreate(newProducts);
        }
        for (const product of updatedProducts) {
            const existingProduct = existingProducts.find((prod) => prod.codigo === product.codigo || prod.referencia === product.referencia);
            if (existingProduct) {
                await producto_1.default.update({
                    stock: existingProduct.stock + product.cantidad,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                }, {
                    where: {
                        [sequelize_1.Op.or]: [
                            { codigo: product.codigo },
                            { referencia: product.referencia },
                        ],
                    },
                });
            }
        }
        return res.json({
            msg: `Se procesaron ${newProducts.length} producto(s) nuevos y se actualizaron ${updatedProducts.length} productos.`,
        });
    }
    catch (error) {
        console.error('Error al procesar productos:', error);
        return res.status(500).json({
            msg: 'Error al procesar productos, comuníquese con soporte.',
        });
    }
};
exports.postProducts = postProducts;
const putProduct = async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const product = await producto_1.default.findByPk(id);
    try {
        if (product) {
            await product.update(body);
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
};
exports.putProduct = putProduct;
const searchProductsByName = async (req, res) => {
    const { name } = req.query;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({
            msg: 'El parámetro "name" es obligatorio y debe ser una cadena de caracteres.'
        });
    }
    try {
        const productName = name.trim();
        const products = await producto_1.default.findAll({
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
        console.error('Error en la búsqueda:', error);
        return res.status(500).json({
            msg: 'Error en la búsqueda, por favor contacte a soporte',
        });
    }
};
exports.searchProductsByName = searchProductsByName;
const searchProductsByCodigo = async (req, res) => {
    const { codigo } = req.query;
    if (!codigo || isNaN(Number(codigo))) {
        return res.status(400).json({
            msg: 'El parámetro "codigo" es obligatorio y debe ser un número.'
        });
    }
    try {
        const productCode = Number(codigo);
        const products = await producto_1.default.findAll({
            where: {
                codigo: productCode
            }
        });
        if (products.length > 0) {
            return res.json({ products });
        }
        else {
            return res.status(404).json({
                msg: `No se encontraron productos con el código: ${productCode}`
            });
        }
    }
    catch (error) {
        console.error('Error en la búsqueda:', error);
        return res.status(500).json({
            msg: 'Error en la búsqueda, por favor contacte a soporte',
        });
    }
};
exports.searchProductsByCodigo = searchProductsByCodigo;
const searchProductsByReferencia = async (req, res) => {
    const { referencia } = req.query;
    if (!referencia || typeof referencia !== 'string') {
        return res.status(400).json({
            msg: 'El parámetro "referencia" es obligatorio y debe ser una cadena de caracteres.'
        });
    }
    try {
        const productReference = referencia.trim();
        const products = await producto_1.default.findAll({
            where: {
                referencia: {
                    [sequelize_1.Op.like]: `%${productReference}%`
                }
            }
        });
        if (products.length > 0) {
            return res.json({ products });
        }
        else {
            return res.status(404).json({
                msg: `No se encontraron productos con la referencia: ${productReference}`
            });
        }
    }
    catch (error) {
        console.error('Error en la búsqueda:', error);
        return res.status(500).json({
            msg: 'Error en la búsqueda, por favor contacte a soporte',
        });
    }
};
exports.searchProductsByReferencia = searchProductsByReferencia;
