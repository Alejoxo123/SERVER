"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const productosRoutes_1 = __importDefault(require("../routes/productosRoutes"));
const connection_1 = __importDefault(require("../db/connection"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
const ventasRoutes_1 = __importDefault(require("../routes/ventasRoutes"));
const ingresosRoutes_1 = __importDefault(require("../routes/ingresosRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
class Server {
    constructor() {
        console.log(process.env.PORT);
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API Working'
            });
        });
        this.app.use('/api/productos', productosRoutes_1.default);
        this.app.use('/api/auth', authRoutes_1.default);
        this.app.use('/api/ventas', ventasRoutes_1.default);
        this.app.use('/api/ingresos', ingresosRoutes_1.default);
    }
    midlewares() {
        //parseamos el body
        this.app.use(express_1.default.json());
        //cors
        this.app.use((0, cors_1.default)());
    }
    async dbConnect() {
        try {
            await connection_1.default.authenticate();
            console.log('base de datos conectadaaa');
        }
        catch (error) {
            console.log(error);
            console.log('Error al conectarce a la base de datos');
        }
    }
}
exports.default = Server;
