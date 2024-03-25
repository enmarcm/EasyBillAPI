import cors from 'cors';
import { Response } from '../adapters/expressAdapter';
import { IncomingHttpHeaders } from 'http';

/**
 * Middleware function to handle CORS (Cross-Origin Resource Sharing).
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
interface CorsRequest {
  method?: string;
  headers: IncomingHttpHeaders;
}

const corsMiddleware = (req: CorsRequest, res: Response, next: (err?: any) => any) => {
  console.log('CORS Middleware');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  cors({ credentials: true, origin: true })(req, res, next);
}

export default corsMiddleware;