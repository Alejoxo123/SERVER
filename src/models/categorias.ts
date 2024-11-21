import { DataTypes } from 'sequelize';
import db from  '../db/connection';

const Categoria = db.define('categorias',{

    idcategorias:  {
        type: DataTypes.INTEGER,
    },
    nombre: {
        type: DataTypes.STRING(100),
    },
    descripcion: {
        type: DataTypes.STRING(200),
    }
},{
    createdAt: false,
    updatedAt: false
})

export default Categoria;