"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const registerUser = async (req, res) => {
    const { nombre, username, email, password, rol, fecha_creacion } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            msg: 'Faltan parámetros requeridos'
        });
    }
    try {
        const emailExist = await User_1.default.findOne({ where: { email } });
        const usernameExist = await User_1.default.findOne({ where: { username } });
        if (emailExist || usernameExist) {
            return res.status(400).json({
                msg: 'El correo ya está registrado'
            });
        }
        const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
        const newUser = await User_1.default.create({ nombre, email, username, password: hashedPassword, rol, fecha_creacion });
        res.json({
            msg: 'Usuario registrado con éxito',
            newUser
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, contacte a soporte'
        });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ where: { email } });
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, contacte a soporte',
        });
    }
};
exports.loginUser = loginUser;
