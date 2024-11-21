import { DataTypes } from 'sequelize';
import db from  '../db/connection';

const Cliente = db.define('clientes',{

    idclientes:  {
        type: DataTypes.INTEGER,
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

export default Cliente;