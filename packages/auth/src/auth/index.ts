import _ from 'lodash';
import Router from 'koa-router';
import * as bcrypt from 'bcrypt';
import { createToken, validator } from '../core';
import { createUserValidationSchema, createUser, getUserByEmail } from '../users';
import { signInValidationSchema } from './auth.validation-schema';
import { rabbitmq } from '../messaging';

export const authRouter = new Router();

authRouter.post('/sign-up',
  validator(createUserValidationSchema),
  async ctx => {
    try {
      const user = await createUser(ctx.request.body);
      const passwordlessUser = _.omit(user, ['password', '_id']);
      Object.assign(passwordlessUser, { accountId: user._id });
      rabbitmq.sendMessage({ msg: JSON.stringify(passwordlessUser) });
      ctx.status = 201;
      ctx.body = passwordlessUser;
    } catch (err) {
      ctx.throw(400, err.message);
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
      ctx.throw(401, { message: err.message });
    }
  }
);
