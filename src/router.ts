import Router from 'koa-router';
import { authRouter } from './auth';
import { userRouter } from './users';
import { isLogged } from './auth';

const router = new Router({
  prefix: '/api/v1',
});

const privateRoutes = new Router();
privateRoutes.use(isLogged);
privateRoutes.use(userRouter.routes());

router.use(authRouter.routes());
router.use(userRouter.routes());

export default router;
