import Router from 'koa-router';
import { validator } from '../core';
import { createUserValidationSchema, userValidationSchema } from './users.validation-schema';
import * as userService from './users.service';

export * from './users.service';
export * from './users.validation-schema';

export const userRouter = new Router({
  prefix: '/users',
});

userRouter.get('/', async ctx => {
  ctx.body = await userService.getUsers();
});

userRouter.post('/',
  validator(createUserValidationSchema),
  async ctx => {
    try {
      const user = await userService.createUser(ctx.request.body);
      ctx.status = 201;
      ctx.body = user;
    } catch (err) {
      ctx.throw(400, { message: err.message });
    }
  }
);

userRouter.get('/:id', async ctx => {
  const { id } = ctx.params;
  const user = await userService.getUserById(id);
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
      ctx.body = await userService.updateUser(id, body);
    } catch (err) {
      ctx.throw(400, { message: err.message });
    }
  }
);

userRouter.delete('/:id', async ctx => {
  const { id } = ctx.params;
  await userService.deleteUserById(+id);
  ctx.status = 204;
});

userRouter.post('/:id/file', async ctx => {
  try {
    const { id } = ctx.params;
    const uploadedFileData = ctx.request.files.file;
    await userService.uploadUserFile(id, uploadedFileData);
    ctx.status = 200;
  } catch (err) {
    ctx.throw(400, { message: err.message });
  }
});

userRouter.post('/:id/file/:fileId/share', async ctx => {
  try {
    const { fileId } = ctx.params;
    const { userId } = ctx.request.body; 
    await userService.shareFile(fileId, userId);
    ctx.status = 200;
  } catch (err) {
    ctx.throw(400, { message: err.message });
  }
});

userRouter.get('/:id/profile', async ctx => {
  try {
    const { id } = ctx.params;
    ctx.body = await userService.getProfileById(id);
  } catch (err) {
    ctx.throw(400, { message: err.message });
  }
});