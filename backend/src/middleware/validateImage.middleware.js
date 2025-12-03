import {createImageSchema, updateImageSchema, idImageSchema} from '../schema/image.schema.js';

export const validateCreateImage = (req, res, next) => {
    const result = createImageSchema.safeParse(req.body);
    
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
    
    req.body = result.data;
    next();
};

export const validateUpdateImage = (req, res, next) => {
    const result = updateImageSchema.safeParse(req.body);
    
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
    
    req.body = result.data;
    next();
};

export const validateIdImage = (req, res, next) => {
    const result = idImageSchema.safeParse(req.params);
    
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
    
    req.params = result.data;
    next();
};
