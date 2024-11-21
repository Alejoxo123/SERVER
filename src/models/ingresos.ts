import { DataTypes } from 'sequelize';
import db from  '../db/connection';

const Ingreso = db.define('ingresos',{

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,  
        autoIncrement: true,
    },
    codigo_producto: {
        type: DataTypes.INTEGER,
    },
    proveedor_id: {
        type: DataTypes.INTEGER,
    },
    cantidad: {
        type: DataTypes.INTEGER,
    },
    fecha_ingreso: {
        type: DataTypes.DATEONLY,
    }

},{
    createdAt: false,
    updatedAt: false
})

export default Ingreso;