import Router from 'koa-router';
import { validator } from '../core';
import { getUsers, createUser, getUserById, deleteUserById, updateUser } from './users.service';
import { createUserValidationSchema, userValidationSchema } from './users.validation-schema';

export * from './users.service';
export * from './users.validation-schema';

export const userRouter = new Router({
  prefix: '/users',
});

userRouter.get('/', async ctx => {
  ctx.body = await getUsers();
});

userRouter.post('/',
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

userRouter.get('/:id', async ctx => {
  const { id } = ctx.params;
  const user = await getUserById(id);
  if (!user) {
    ctx.throw(404)
  }
  ctx.body = user;
});

userRouter.put('/:id', 
  validator(userValidationSchema),
  async ctx => {
    try {
      const { id } = ctx.params;
      const { body } = ctx.request;
      ctx.body = await updateUser(id, body);
    } catch (err) {
      ctx.throw(err.message, 400);
    }
  }
);

userRouter.delete('/:id', async ctx => {
  const { id } = ctx.params;
  await deleteUserById(+id);
  ctx.status = 204;
});
