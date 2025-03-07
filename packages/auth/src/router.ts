import Router from 'koa-router';
import { authRouter } from './auth';

const router = new Router({
  prefix: '/auth/v1',
});

router.use(authRouter.routes());

export default router;
