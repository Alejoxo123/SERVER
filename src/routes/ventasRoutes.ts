import { Router } from 'express';
import { crearVenta, getCliente, getVentaConDetalles } from '../controllers/ventasControllers';

const router = Router();

router.get('/cliente', getCliente);
router.get('/:id', getVentaConDetalles as any);
router.post('/crearventa', crearVenta as any);



export default router;