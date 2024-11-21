import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

export interface IVenta {
    id?: number;
    cliente_id: number;
    usuario_id: number;
    fecha: Date;
    total: number;
}


class Venta extends Model<IVenta> implements IVenta {
    public id!: number;
    public cliente_id!: number;
    public usuario_id!: number;
    public fecha!: Date;
    public total!: number;
}


Venta.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cliente_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'clientes', 
                key: 'idclientes'
            }
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        
    },
    {
        timestamps: true,
        sequelize: db,
        modelName: 'Venta',
        tableName: 'ventas',
    }
);



export default Venta;
