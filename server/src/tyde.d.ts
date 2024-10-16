// src/express.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload; // Ajustez selon ce que vous attendez dans user
        }
    }
}
