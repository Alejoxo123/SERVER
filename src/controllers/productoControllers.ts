import { Request, Response } from 'express';
import Producto from '../models/producto';
import { Op } from 'sequelize';

export const getProducts = async (req: Request, res: Response) => {
    const ListProducts = await Producto.findAll()

    res.json({ ListProducts })
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Producto.findByPk(id);
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Producto.findByPk(id);
    if (!product) {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    } else {
        await product.destroy();
        res.json({ msg: 'Producto eliminado con exito' })
    }
}


export const postProducts = async (req: Request, res: Response) => {
    const { body } = req;

    if (!Array.isArray(body)) {
        return res.status(400).json({
            msg: 'El cuerpo de la solicitud debe ser un array de productos.',
        });
    }
    const requiredFields = ['codigo', 'name', 'description', 'referencia', 'stock', 'price'];
    const isValid = body.every(product =>
        requiredFields.every(field => field in product)
    );

    if (!isValid) {
        return res.status(400).json({
            msg: 'Todos los productos deben incluir los campos: codigo, referencia, name, description, price, cantidad.',
        });
    }
    try {
        const productCodes = body.map((product: any) => product.codigo);
        const productReferences = body.map((product: any) => product.referencia);

        const existingProducts = await Producto.findAll({
            where: {
                [Op.or]: [
                    { codigo: productCodes },
                    { referencia: productReferences },
                ],
            },
        });

        const existingCodes = existingProducts.map((product: any) => product.codigo);
        const existingReferences = existingProducts.map((product: any) => product.referencia);

        const newProducts = body.filter(
            (product: any) => !existingCodes.includes(product.codigo) && !existingReferences.includes(product.referencia)
        );
        const updatedProducts = body.filter(
            (product: any) => existingCodes.includes(product.codigo) || existingReferences.includes(product.referencia)
        );

        if (newProducts.length > 0) {
            await Producto.bulkCreate(newProducts);
        }

        for (const product of updatedProducts) {
            const existingProduct = existingProducts.find(
                (prod: any) => prod.codigo === product.codigo || prod.referencia === product.referencia
            );

            if (existingProduct) {
                await Producto.update(
                    {
                        stock: existingProduct.stock + product.cantidad,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                    },
                    {
                        where: {
                            [Op.or]: [
                                { codigo: product.codigo },
                                { referencia: product.referencia },
                            ],
                        },
                    }
                );
            }
        }

        return res.json({
            msg: `Se procesaron ${newProducts.length} producto(s) nuevos y se actualizaron ${updatedProducts.length} productos.`,
        });
    } catch (error) {
        console.error('Error al procesar productos:', error);
        return res.status(500).json({
            msg: 'Error al procesar productos, comuníquese con soporte.',
        });
    }
};



export const putProduct = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    const product = await Producto.findByPk(id);
    try {
        if (product) {
            await product.update(body);
            res.json({
                msg: 'Producto actualizado con exito'
            })
        } else {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Error al actualizar producto, comuniquese con soporte'

        })

    }

}

export const searchProductsByName = async (req: Request, res: Response) => {
    const { name } = req.query;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({
            msg: 'El parámetro "name" es obligatorio y debe ser una cadena de caracteres.'
        });
    }

    try {
        const productName = name.trim();
        const products = await Producto.findAll({
            where: {
                name: {
                    [Op.like]: `%${productName}%`
                }
            }
        });

        if (products.length > 0) {
            return res.json({ products });
        } else {
            return res.status(404).json({
                msg: `No se encontraron productos con el nombre: ${productName}`
            });
        }

    } catch (error) {
        console.error('Error en la búsqueda:', error);
        return res.status(500).json({
            msg: 'Error en la búsqueda, por favor contacte a soporte',
        });
    }
}

export const searchProductsByCodigo = async (req: Request, res: Response) => {
    const { codigo } = req.query;
    if (!codigo || isNaN(Number(codigo))) {
        return res.status(400).json({
            msg: 'El parámetro "codigo" es obligatorio y debe ser un número.'
        });
    }

    try {

        const productCode = Number(codigo);
        const products = await Producto.findAll({
            where: {
                codigo: productCode
            }
        });

        if (products.length > 0) {
            return res.json({ products });
        } else {
            return res.status(404).json({
                msg: `No se encontraron productos con el código: ${productCode}`
            });
        }

    } catch (error) {
        console.error('Error en la búsqueda:', error);
        return res.status(500).json({
            msg: 'Error en la búsqueda, por favor contacte a soporte',
        });
    }
};

export const searchProductsByReferencia = async (req: Request, res: Response) => {

    const { referencia } = req.query;

    if (!referencia || typeof referencia !== 'string') {
        return res.status(400).json({
            msg: 'El parámetro "referencia" es obligatorio y debe ser una cadena de caracteres.'
        });
    }

    try {

        const productReference = referencia.trim();
        const products = await Producto.findAll({
            where: {
                referencia: {
                    [Op.like]: `%${productReference}%`
                }
            }
        });

        if (products.length > 0) {
            return res.json({ products });
        } else {
            return res.status(404).json({
                msg: `No se encontraron productos con la referencia: ${productReference}`
            });
        }

    } catch (error) {
        console.error('Error en la búsqueda:', error);
        return res.status(500).json({
            msg: 'Error en la búsqueda, por favor contacte a soporte',
        });
    }
};









