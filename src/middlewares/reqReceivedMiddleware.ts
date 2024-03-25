import { Request, Response, NextFunction } from '../adapters/expressAdapter';
/**
 * Middleware function that logs the received request information.
 * @param {Request} req - The request object.
 * @param {Response} _res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
const reqReceivedMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    console.log(`${req.method} RECEIVED ${req.protocol}:/${req.url}`);
    next();
}

export default reqReceivedMiddleware;