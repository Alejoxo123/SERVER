"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVentaConDetalles = exports.getClientes = exports.getCliente = exports.crearVenta = void 0;
const ventas_1 = __importDefault(require("../models/ventas"));
const detalles_venta_1 = __importDefault(require("../models/detalles_venta"));
const clientes_1 = __importDefault(require("../models/clientes"));
const User_1 = __importDefault(require("../models/User"));
const producto_1 = __importDefault(require("../models/producto"));
const crearVenta = async (req, res) => {
    try {
        const { username, fecha, total, clienteid, productos } = req.body;
        const usuario = await User_1.default.findOne({ where: { username } });
        if (!usuario) {
            return res.status(400).json({ message: "Usuario no encontrado." });
        }
        const nuevaVenta = await ventas_1.default.create({
            fecha,
            total,
            usuario_id: usuario.idUsers,
            cliente_id: clienteid
        });
        for (const producto of productos) {
            const { codigo, nombre, descripcion, cantidad, precioUnitario, precioTotal } = producto;
            const productoEncontrado = await producto_1.default.findOne({ where: { codigo } });
            if (!productoEncontrado) {
                return res.status(400).json({ message: `Producto con código ${codigo} no encontrado.` });
            }
            if (productoEncontrado.stock < cantidad) {
                return res.status(400).json({ message: `Stock insuficiente para el producto con código ${codigo}.` });
            }
            await detalles_venta_1.default.create({
                venta_id: nuevaVenta.id,
                codigo_producto: codigo,
                nombre_producto: nombre,
                descripcion_producto: descripcion,
                cantidad,
                precio_unitario: precioUnitario,
                subtotal: precioTotal,
            });
            productoEncontrado.stock -= cantidad;
            await productoEncontrado.save();
        }
        return res.status(201).json({ message: 'Venta creada exitosamente', venta: nuevaVenta });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Hubo un error al crear la venta', error });
    }
};
exports.crearVenta = crearVenta;
const getCliente = async (req, res) => {
    const { documento_identidad } = req.query;
    try {
        const cliente = await clientes_1.default.findAll({
            attributes: ['idclientes', 'documento_identidad', 'nombre', 'telefono', 'email', 'direccion'],
            where: {
                documento_identidad: documento_identidad,
            },
        });
        if (cliente) {
            res.json(cliente);
        }
        else {
            res.status(404).json({
                msg: `No existe un cliente con el documento de identidad ${documento_identidad}`,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al buscar el cliente',
            error: error.message,
        });
    }
};
exports.getCliente = getCliente;
const getClientes = async (req, res) => {
    const ListClientes = await clientes_1.default.findAll();
    res.json({ ListClientes });
};
exports.getClientes = getClientes;
const getVentaConDetalles = async (req, res) => {
    const { id } = req.params;
    try {
        const venta = await ventas_1.default.findByPk(id);
        console.log('ID recibido:', id);
        if (!venta) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }
        const detalles = await detalles_venta_1.default.findAll({
            where: { venta_id: id },
        });
        return res.status(200).json({
            venta,
            detalles,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Hubo un error al obtener la venta y los detalles',
            error: error instanceof Error ? error.message : 'Error desconocido',
        });
    }
};
exports.getVentaConDetalles = getVentaConDetalles;
