import { verifyToken } from '../core';

export const isLogged = async (ctx, next) => {
  const authorization = ctx.get('authorization');
  if (!authorization) {
    ctx.throw(401);
  }
  const [bearer, tokenVal] = authorization.split(' ');
  if (!bearer || !verifyToken(tokenVal)) {
    ctx.throw(403);
  }
  
  await next();
}
