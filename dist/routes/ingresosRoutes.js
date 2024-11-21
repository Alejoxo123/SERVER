"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IngresosControllers_1 = require("../controllers/IngresosControllers");
const router = (0, express_1.Router)();
router.get('/llamarproovedor', IngresosControllers_1.searchProvidersByDocument);
router.post('/ingresarProductos', IngresosControllers_1.registrarIngreso);
exports.default = router;
