"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventasControllers_1 = require("../controllers/ventasControllers");
const router = (0, express_1.Router)();
router.get('/cliente', ventasControllers_1.getCliente);
router.get('/:id', ventasControllers_1.getVentaConDetalles);
router.post('/crearventa', ventasControllers_1.crearVenta);
exports.default = router;
