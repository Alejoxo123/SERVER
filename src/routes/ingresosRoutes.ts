import { Router } from "express";
import { registrarIngreso, searchProvidersByDocument } from '../controllers/IngresosControllers';

const router = Router();

router.get('/llamarproovedor', searchProvidersByDocument as any);
router.post('/ingresarProductos', registrarIngreso as any)


export default router;