import { DataTypes } from 'sequelize';
import db from  '../db/connection';

const Proveedor = db.define('proveedores',{

    idproveedores: {
        type:  DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
    },
    documento_identidad: {
        type: DataTypes.STRING(50),
    },
    telefono: {
        type: DataTypes.STRING(20),
    },
    email: {
        type: DataTypes.STRING(100),
    },
    direccion: {
        type: DataTypes.STRING(255),
    }


},{
    createdAt: false,
    updatedAt: false
})

export default Proveedor;