import { Router } from 'express';
import {
    searchProductsByName,
    deleteProduct, 
    getProduct, 
    getProducts, 
    postProducts, 
    putProduct,
    searchProductsByCodigo,
    searchProductsByReferencia,
    
} from '../controllers/productoControllers';

const router = Router();

router.get('/searchname', searchProductsByName as any);
router.get('/searchcode', searchProductsByCodigo as any);
router.get('/searchreference', searchProductsByReferencia as any);
router.get('/', getProducts);
router.get('/:codigo', getProduct);
router.delete('/:codigo', deleteProduct);
router.post('/crear', postProducts as any);
router.put('/:codigo', putProduct);

export default router;


