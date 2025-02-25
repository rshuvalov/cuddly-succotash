// import './instrument';

import Koa from 'koa';
import koaBody from 'koa-body';
import config from './config';
import router from './router';
import { db } from './db';

(async () => {
  await db.init();

  const app = new Koa();
  app.use(koaBody());
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err?.status || 500;
      ctx.body = err.message;
    }
  });
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
})();
