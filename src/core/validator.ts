import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

export const validator = schema => async (ctx, next) => {
  const validate = ajv.compile(schema);
  const valid = validate(ctx.request.body);
  if (!valid) {
    ctx.throw(400, { message: validate.errors });
  }
  
  await next();
}
