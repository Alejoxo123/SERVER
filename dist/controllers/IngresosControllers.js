"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarIngreso = exports.searchProvidersByDocument = void 0;
const proveedores_1 = __importDefault(require("../models/proveedores"));
const ingresos_1 = __importDefault(require("../models/ingresos"));
const producto_1 = __importDefault(require("../models/producto"));
const searchProvidersByDocument = async (req, res) => {
    const { documento_identidad } = req.query;
    if (!documento_identidad || typeof documento_identidad !== 'string') {
        return res.status(400).json({
            msg: 'El parámetro "documento_identidad" es obligatorio y debe ser una'
        });
    }
    try {
        const providerDocument = documento_identidad;
        const providers = await proveedores_1.default.findAll({
            where: {
                documento_identidad: documento_identidad,
            }
        });
        if (providers.length > 0) {
            return res.json(providers);
        }
        else {
            return res.status(404).json({
                msg: `No se encontraron productos con la referencia: ${providerDocument}`
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
exports.searchProvidersByDocument = searchProvidersByDocument;
const registrarIngreso = async (req, res) => {
    const { productos, proveedorId, fechaIngreso } = req.body;
    if (!productos || !proveedorId || !fechaIngreso) {
        return res.status(400).json({
            msg: 'Faltan datos necesarios. Asegúrese de enviar los productos, proveedorId y fechaIngreso.'
        });
    }
    try {
        for (let producto of productos) {
            const productoExistente = await producto_1.default.findOne({
                where: { codigo: producto.codigo }
            });
            if (!productoExistente) {
                return res.status(404).json({
                    msg: `Producto con código ${producto.codigo} no encontrado.`
                });
            }
            await productoExistente.update({
                stock: productoExistente.stock + producto.cantidad,
                price: producto.precio,
            });
            await ingresos_1.default.create({
                codigo_producto: productoExistente.codigo,
                proveedor_id: proveedorId,
                cantidad: producto.cantidad,
                fecha_ingreso: fechaIngreso,
            });
        }
        return res.status(201).json({
            msg: 'Ingreso registrado correctamente.'
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error al registrar el ingreso:', error.message);
            return res.status(500).json({
                msg: 'Error al registrar el ingreso. Por favor, inténtelo de nuevo.',
                error: error.message
            });
        }
        else {
            console.error('Error desconocido:', error);
            return res.status(500).json({
                msg: 'Error al registrar el ingreso. Por favor, inténtelo de nuevo.',
                error: 'Error desconocido'
            });
        }
    }
};
exports.registrarIngreso = registrarIngreso;
