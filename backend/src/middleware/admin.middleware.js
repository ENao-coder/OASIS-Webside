import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

import adminRepository from '../repositories/admin.repository.js';

export const verifyAdminToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await adminRepository.getById(decoded.id);

        if (!admin || admin.activeToken !== token) {
            return res.status(401).json({ error: 'Access denied. Invalid session.' });
        }

        req.admin = decoded;
        next();

    } catch (error) {
        console.error('Token verification error:', error.message);
        res.status(401).json({ message: 'Invalid token.' });
    }
}