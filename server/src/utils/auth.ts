import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (id_user: number, id_role: string): string => {
    return jwt.sign({ id_user, id_role }, JWT_SECRET, { expiresIn: '3000s' });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, JWT_SECRET);
};

export const hashPassword = async (password: string): Promise<string> => {
    return await argon2.hash(password);
};

export const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
    return await argon2.verify(hash, password);
};