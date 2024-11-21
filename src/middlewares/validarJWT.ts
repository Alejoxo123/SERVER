import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const validarJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la petición' });
    }

    try {
        const { id } = jwt.verify(token, 'SECRET_KEY') as { id: string }; 
        (req as any).userId = id; 

        next(); 
    } catch (error) {
        console.error(error);
        return res.status(401).json({ msg: 'Token no válido' });
    }
};

