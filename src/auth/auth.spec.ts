import * as core from '../core';
import { isLogged } from './auth';

jest.mock('../core');

describe('auth.ts', () => {
  describe('isLogged', () => {
    const token = 'Bearer tokenValuer1234';
    const ctx = {
      get: jest.fn(),
      throw: jest.fn().mockImplementation(() => { throw 'Error' }),
    };
    const next = jest.fn();

    beforeEach(() => {
      ctx.get.mockClear();
      ctx.throw.mockClear();
      next.mockClear();
    });

    it('should throw 401 if authorization is not provided', async () => {
      try {
        await isLogged(ctx, next);
      } catch (err) {
        expect(ctx.throw).toHaveBeenCalledWith(401);
      }
    });

    it('should throw 403 if token is not Bearer', async () => {
      try {
        ctx.get.mockReturnValue('tokenValuer1234');
        await isLogged(ctx, next);
      } catch (err) {
        expect(ctx.throw).toHaveBeenCalledWith(403);
      }
    });

    it('should throw 403 if token is not valid', async () => {
      try {
        ctx.get.mockReturnValue(token);
        (core.verifyToken as any).mockReturnValue(false);
        await isLogged(ctx, next);
      } catch (err) {
        expect(ctx.throw).toHaveBeenCalledWith(403);
      }
    });

    it('should call next in token is valid', async () => {
      ctx.get.mockReturnValue(token);
      (core.verifyToken as any).mockReturnValue(true);
      await isLogged(ctx, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});