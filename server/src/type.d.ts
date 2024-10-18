// src/types.d.ts
import { JwtPayload } from 'jsonwebtoken';

// Interface pour représenter le payload JWT
export interface JwtPayloadWithRole extends JwtPayload {
    id: number;
    email: string;
    role: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayloadWithRole;
        }
    }
}
