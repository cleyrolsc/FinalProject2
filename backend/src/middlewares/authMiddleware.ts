import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware to protect routes
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded; // Attach the decoded token to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

export default authMiddleware;
