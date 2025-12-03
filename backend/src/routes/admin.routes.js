import express from 'express';
import adminController from '../controllers/admin.controller.js';
import { verifyAdminToken } from '../middleware/admin.middleware.js';
import { validateAdmin } from '../middleware/validateAdmin.middleware.js';

import {
    idAdminSchema,
    loginAdminSchema,
    registerAdminSchema,
    updateAdminSchema
} from '../schema/admin.schema.js';

const AdminRoutes = express.Router();

// Public routes
AdminRoutes.post(
    '/register',
    validateAdmin(registerAdminSchema, 'body'),
    adminController.registerAdmin
);

AdminRoutes.post(
    '/login',
    validateAdmin(loginAdminSchema, 'body'),
    adminController.loginAdmin
);

// Protected routes
AdminRoutes.post(
    '/logout',
    verifyAdminToken,
    adminController.logoutAdmin
);

AdminRoutes.get(
    '/:id',
    verifyAdminToken,
    validateAdmin(idAdminSchema, 'params'),
    adminController.getAdminById
);

AdminRoutes.put(
    '/:id',
    verifyAdminToken,
    validateAdmin(idAdminSchema, 'params'),
    validateAdmin(updateAdminSchema, 'body'),
    adminController.updateAdmin
);

AdminRoutes.delete(
    '/:id',
    verifyAdminToken,
    validateAdmin(idAdminSchema, 'params'),
    adminController.deleteAdmin
);

export default AdminRoutes;