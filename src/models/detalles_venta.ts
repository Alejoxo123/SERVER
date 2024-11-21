import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

export interface IDetalle {
    id?: number;
    venta_id: number;
    codigo_producto: string;
    nombre_producto: string;
    descripcion_producto: string;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
}

class Detalle extends Model<IDetalle> implements IDetalle {
    public id!: number;
    public venta_id!: number;
    public codigo_producto!: string;
    public nombre_producto!: string;
    public descripcion_producto!: string;
    public cantidad!: number;
    public precio_unitario!: number;
    public subtotal!: number;
}

Detalle.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        venta_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ventas',
                key: 'id'
            }
        },
        codigo_producto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombre_producto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion_producto: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio_unitario: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        subtotal: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        sequelize: db,
        modelName: 'Detalle',
        tableName: 'detalle_venta', 
    }
);



export default Detalle;
