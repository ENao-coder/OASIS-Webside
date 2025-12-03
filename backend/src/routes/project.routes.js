import express from 'express';
import projectController from '../controllers/project.controller.js';
import { verifyAdminToken } from '../middleware/admin.middleware.js';
import { validateProject } from '../middleware/validateProject.middleware.js';

import {
    createProjectSchema,
    updateProjectSchema,
    idProjectSchema
} from '../schema/project.schema.js';

const ProjectRoutes = express.Router();

// Public routes
ProjectRoutes.get(
    '/',
    projectController.getAll
);

ProjectRoutes.get(
    '/:id',
    validateProject(idProjectSchema, 'params'),
    projectController.getById
);

// Protected routes (require admin authentication)
ProjectRoutes.post(
    '/',
    verifyAdminToken,
    validateProject(createProjectSchema, 'body'),
    projectController.create
);

ProjectRoutes.put(
    '/:id',
    verifyAdminToken,
    validateProject(idProjectSchema, 'params'),
    validateProject(updateProjectSchema, 'body'),
    projectController.update
);

ProjectRoutes.delete(
    '/:id',
    verifyAdminToken,
    validateProject(idProjectSchema, 'params'),
    projectController.delete
);

export default ProjectRoutes;
