import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['Authorization'] as string;
    
    if (!authHeader) 
        return res.status(401).json({ message: "Access Denied: No token provided"});
    
    try {
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
}
