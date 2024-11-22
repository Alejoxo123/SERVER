import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routesProducto from '../routes/productosRoutes';
import db from  '../db/connection';
import dotenv from 'dotenv';
import authRoutes from '../routes/authRoutes';
import ventasRoutes from  '../routes/ventasRoutes';
import ingresosRoutes from '../routes/ingresosRoutes';

dotenv.config(); 

const app = express();

class Server {

    private app: Application;
    private port: string;

    constructor() {
        console.log(process.env.PORT);
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`)
        })
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg:'API Working'
            })
        })

        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/productos', routesProducto);
        this.app.use('/api/ventas', ventasRoutes);
        this.app.use('/api/ingresos', ingresosRoutes);

    }

    midlewares(){
        //parseamos el body
        this.app.use(express.json());

        //cors
        this.app.use(cors());
    }

    async dbConnect (){

        try {  
            await db.authenticate();
            console.log('base de datos conectadaaa');
        } catch (error) {
            console.log(error);
            console.log('Error al conectarce a la base de datos');   
        }
       
    }


}




export default Server;   