import Koa from "koa";
import * as cartController from '../controllers/cart.controller.js';
import Router from "koa-router";

const router = new Router()


router.get('/:id/productos', cartController.getProducts);

router.post('/', cartController.create);
router.post('/:id/productos', cartController.addProduct);

router.delete('/:id/productos/:id_prod', cartController.removeProduct);
router.delete('/:id', cartController.remove);

export default router;