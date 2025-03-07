import { validator } from './validator';

let validateMock = jest.fn();

jest.mock('ajv', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    compile: jest.fn().mockImplementation(() => validateMock),
  })),
}));
jest.mock('ajv-formats');

describe('validator.ts', () => {
  describe('validator', () => {
    const schema = {};
    const ctx = {
      request:{
        body: '',
      },
      throw: jest.fn().mockImplementation(() => { throw 'Error' }),
    };
    const next = jest.fn();

    afterEach(() => {
      ctx.throw.mockClear();
      next.mockClear();
      validateMock.mockClear();
    });

    it('should throw 400 if schema is not valid', async () => {
      try {
        validateMock.mockReturnValue(false);
        await validator(schema)(ctx, next);
      } catch (err) {
        expect(ctx.throw).toHaveBeenCalledWith(undefined, 400);
      }
    });

    it('should call next if schema is valid', async () => {
      validateMock.mockReturnValue(true);
      await validator(schema)(ctx, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
