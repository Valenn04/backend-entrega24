import Koa from "koa";
import * as otherController from '../controllers/other.controller.js';
import Router from "koa-router";

const router = new Router()

router.get('/info', otherController.getInfo);
router.get('/randoms', otherController.getRandomNumbers);

export default router;