import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

import adminRepository from '../repositories/admin.repository.js';

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await adminRepository.getAdminById(decoded.id);

        if (!admin || admin.activeToken !== token) {
            return res.status(401).json({ error: 'Access denied. Invalid session.' });
        }

        req.admin = decoded
        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
}

export const verifyAdminToken = verifyToken;

export const validateAdmin = (schema, type = 'body') => (req, res, next) => {
    const data = type === 'params' ? req.params : req.body;
    const result = schema.safeParse(data);

    if (!result.success) {
        const errors = result.error.issues.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
        }));
        return res.status(400).json({ 
            ok: false,
            message: 'Validation Error',
            errors
         });
    }

    if (type === 'body') {
        req.body = result.data;
    } else {
        req.params = result.data;
    }

    next();
};
