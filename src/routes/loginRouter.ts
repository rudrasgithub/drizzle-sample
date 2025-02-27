import { Request, Response, Router } from "express";
import jwt from 'jsonwebtoken';

const router = Router();

const JWT_SECRET = "rudra123"

router.post('/login', (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const token = jwt.sign(email, JWT_SECRET);
        res.json(token);
    } catch (err) {
        res.status(401).json({ message: "invalid token" });
    }

})

export default router;