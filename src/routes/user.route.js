import Koa from "koa";
import * as userController from '../controllers/user.controller.js';
import {logIn} from "../controllers/user.controller.js";
import Router from "koa-router";

const router = new Router()

router.get('/login', userController.logInView);
router.get('/signup', userController.signUpView);
router.get('/', userController.homeView);
router.get('/logout', userController.logOutView);

router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);

export default router;
