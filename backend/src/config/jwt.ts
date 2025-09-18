import { Secret } from 'jsonwebtoken';

export const jwtSecret: Secret = process.env.JWT_SECRET || 'your-secret-key';
export const jwtExpiresIn: string = process.env.JWT_EXPIRES_IN || '1h';