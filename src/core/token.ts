import * as jwt from 'jsonwebtoken';
import config from '../config';

export const createToken = (user) => jwt.sign(
  {
    data: {
      id: user.id,
    },
  },
  config.jwtSecret,
  { expiresIn: '1h' },
);

export const verifyToken = (token) => jwt.verify(token, config.jwtSecret);
