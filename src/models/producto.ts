import { Model, DataTypes } from 'sequelize';
import db from '../db/connection';

interface ProductoAttributes {
    codigo: number; 
    name: string;
    description: string;
    price: number;
    stock: number;
    referencia: string;
}

class Producto extends Model<ProductoAttributes> implements ProductoAttributes {
    public codigo!: number; 
    public name!: string;
    public description!: string;
    public price!: number;
    public stock!: number;
    public referencia!: string;
}

Producto.init(
    {
        codigo: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        referencia: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: db, 
        modelName: 'Producto',
        timestamps: false,
    }
);

export default Producto;
