import { Request, Response } from 'express';
import Proveedor from '../models/proveedores'
import Ingreso from '../models/ingresos';
import Producto from '../models/producto';

export const searchProvidersByDocument = async (req: Request, res: Response) => {
    const { documento_identidad } = req.query;

    if (!documento_identidad || typeof documento_identidad !== 'string') {
        return res.status(400).json({
            msg: 'El parámetro "documento_identidad" es obligatorio y debe ser una'
        });
    }

    try {
        const providerDocument = documento_identidad;
        const providers = await Proveedor.findAll({

            where: {
                documento_identidad: documento_identidad,
            }
        });
        if (providers.length > 0) {
            return res.json(providers);
        } else {
            return res.status(404).json({
                msg: `No se encontraron productos con la referencia: ${providerDocument}`
            });
        }

    } catch (error) {
        console.error('Error en la búsqueda:', error);
        return res.status(500).json({
            msg: 'Error en la búsqueda, por favor contacte a soporte',
        });

    }


}

export const registrarIngreso = async (req: Request, res: Response) => {
    const { productos, proveedorId, fechaIngreso } = req.body;

    if (!productos || !proveedorId || !fechaIngreso) {
        return res.status(400).json({
            msg: 'Faltan datos necesarios. Asegúrese de enviar los productos, proveedorId y fechaIngreso.'
        });
    }

    try {

        for (let producto of productos) {
            const productoExistente = await Producto.findOne({
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
            await Ingreso.create({
                codigo_producto: productoExistente.codigo,
                proveedor_id: proveedorId,
                cantidad: producto.cantidad,
                fecha_ingreso: fechaIngreso,
            });
        }

        return res.status(201).json({
            msg: 'Ingreso registrado correctamente.'
        });
    } catch (error: unknown) {
        if (error instanceof Error) {

            console.error('Error al registrar el ingreso:', error.message);
            return res.status(500).json({
                msg: 'Error al registrar el ingreso. Por favor, inténtelo de nuevo.',
                error: error.message
            });
        } else {
            console.error('Error desconocido:', error);
            return res.status(500).json({
                msg: 'Error al registrar el ingreso. Por favor, inténtelo de nuevo.',
                error: 'Error desconocido'
            });
        }
    }
};
