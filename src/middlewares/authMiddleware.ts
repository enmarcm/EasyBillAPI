import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware function to authenticate requests using JWT token.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'] || '';

    if (!token) return res.status(401).json({ message: 'No token provided' });

    const tokenValue = token.split(' ')[1];

    try {
        jwt.verify(tokenValue, process.env.JWT_SECRET as jwt.Secret, (error: any, decodedToken: any) => {
            if (error) return res.status(401).json({ message: 'Invalid token' });
            (req as any).user = decodedToken.userId;
            return;
        });
        return next();
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export default authMiddleware;