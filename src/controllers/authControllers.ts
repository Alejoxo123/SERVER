import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';



export const registerUser = async (req: Request, res: Response) => {
    const { nombre, username, email, password, rol, fecha_creacion } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            msg: 'Faltan parámetros requeridos'
        });
    }

    try {



        const emailExist = await User.findOne({ where: { email } });
        const usernameExist = await User.findOne({ where: { username } });
        if (emailExist || usernameExist) {
            return res.status(400).json({
                msg: 'El correo ya está registrado'
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({ nombre, email, username, password: hashedPassword, rol, fecha_creacion });

        res.json({
            msg: 'Usuario registrado con éxito',
            newUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, contacte a soporte'
        });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                msg: 'Correo o contraseña incorrectos',
            });
        }

        // Comparar las contraseñas en texto claro
        if (user.password !== password) {
            return res.status(400).json({
                msg: 'Correo o contraseña incorrectos',
            });
        }

        // Si las contraseñas coinciden, respondemos con el rol
        return res.json({
            msg: 'Login exitoso',
            role: user.rol, // Devolver solo el rol
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, contacte a soporte',
        });
    }
};
