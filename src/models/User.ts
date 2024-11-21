import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface UsuarioAttributes {
    idUsers?: number;
    nombre: string;
    username: string;
    email: string;
    password: string;
    rol: string;
    fecha_creacion:  Date;

}

class User extends Model<UsuarioAttributes> implements UsuarioAttributes {
    public idUsers!: number;
    public nombre!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    public rol!: string;
    public fecha_creacion!: Date;
  
}
User.init({
    idUsers: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
    },
    fecha_creacion: {
        type: DataTypes.DATE,
    }

}, {
    sequelize: db,
    modelName: 'Usuario',
    timestamps: false,
});

export default User;
