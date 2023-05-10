import Koa from "koa";
import auth from "../middlewares/auth.middleware.js";
import * as productController from '../controllers/product.controller.js'
import Router from "koa-router";

const router = new Router()

router.get('/', productController.getAll);
router.get('/:id', productController.getById);

router.post('/', auth, productController.create);

router.put('/:id', auth, productController.update);

router.delete('/:id', auth, productController.remove);

export default router;
