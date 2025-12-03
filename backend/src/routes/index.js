import express from 'express';
import adminRoutes from './admin.routes.js';
import eventRoutes from './event.routes.js';
import projectRoutes from './project.routes.js';
import imageRoutes from './image.routes.js';

const router = express.Router();

router.use('/admins', adminRoutes);
router.use('/events', eventRoutes);
router.use('/projects', projectRoutes);
router.use('/images', imageRoutes);

export default router;
