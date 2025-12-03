export const validateProject = (schema, type = 'body') => (req, res, next) => {
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