import Router from 'koa-router';
import { userRouter } from './users';
import { isLogged } from './auth';

const privateRoutes = new Router({
  prefix: '/api/v1',
});
privateRoutes.use(isLogged);
privateRoutes.use(userRouter.routes());


export default privateRoutes;
