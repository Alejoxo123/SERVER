import { Request, Response } from 'express';
import Venta from '../models/ventas';
import Detalle from '../models/detalles_venta';
import Cliente from '../models/clientes';
import User from '../models/User'
import Producto from '../models/producto'



export const crearVenta = async (req: Request, res: Response) => {
  try {
    const { username, fecha, total, clienteid, productos } = req.body;
    const usuario = await User.findOne({ where: { username } });
    if (!usuario) {
      return res.status(400).json({ message: "Usuario no encontrado." });
    }
    const nuevaVenta = await Venta.create({
      fecha,
      total,
      usuario_id: usuario.idUsers,
      cliente_id: clienteid
    });

    for (const producto of productos) {
      const { codigo, nombre, descripcion, cantidad, precioUnitario, precioTotal } = producto;
      const productoEncontrado = await Producto.findOne({ where: { codigo } });
      if (!productoEncontrado) {
        return res.status(400).json({ message: `Producto con código ${codigo} no encontrado.` });
      }

      if (productoEncontrado.stock < cantidad) {
        return res.status(400).json({ message: `Stock insuficiente para el producto con código ${codigo}.` });
      }

      await Detalle.create({
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al crear la venta', error });
  }
};


export const getCliente = async (req: Request, res: Response) => {
  const { documento_identidad } = req.query;

  try {
    const cliente = await Cliente.findAll({
      attributes: ['idclientes', 'documento_identidad', 'nombre', 'telefono', 'email', 'direccion'],
      where: {
        documento_identidad: documento_identidad,
      },
    });

    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({
        msg: `No existe un cliente con el documento de identidad ${documento_identidad}`,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      msg: 'Error al buscar el cliente',
      error: error.message,
    });
  }
};

export const getClientes = async (req: Request, res: Response) => {
  const ListClientes = await Cliente.findAll();
  res.json({ ListClientes });

};

export const getVentaConDetalles = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {

    const venta = await Venta.findByPk(id);
    console.log('ID recibido:', id);

    if (!venta) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }

    const detalles = await Detalle.findAll({
      where: { venta_id: id },
    });

    return res.status(200).json({
      venta,
      detalles,
    });
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({
      message: 'Hubo un error al obtener la venta y los detalles',
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};



