import * as jwt from 'jsonwebtoken';
import config from '../config';

export const verifyToken = (token) => jwt.verify(token, config.jwtSecret);
