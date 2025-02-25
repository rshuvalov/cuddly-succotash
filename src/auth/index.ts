import Router from 'koa-router';
import * as bcrypt from 'bcrypt';
import { createToken, validator } from '../core';
import { createUserValidationSchema, createUser, getUserByEmail } from '../users';
import { signInValidationSchema } from './auth.vavlidation-schema';
export * from './auth';

export const authRouter = new Router({
  prefix: '/auth',
});

authRouter.post('/sign-up',
  validator(createUserValidationSchema),
  async ctx => {
    try {
      const user = await createUser(ctx.request.body);
      ctx.status = 201;
      ctx.body = user;
    } catch (err) {
      ctx.throw(err.message, 400);
    }
  }
);

authRouter.post('/sign-in',
  validator(signInValidationSchema),
  async ctx => {
    try {
      const { email, password } = ctx.request.body;
      const user = await getUserByEmail(email);
      if (!user) {
        throw new Error(`User with email ${email} not found`);
      }
      bcrypt.compareSync(password, user.password);
      ctx.body = {
        token: createToken(user),
      };
    } catch (err) {
      ctx.throw(err.message, 401);
    }
  }
);
