import express from 'express';
import imageController from '../controllers/image.controller.js';
import { verifyAdminToken } from '../middleware/admin.middleware.js';
import {validateCreateImage, validateUpdateImage, validateIdImage} from '../middleware/validateImage.middleware.js';

const router = express.Router();

// Public routes
router.get('/', imageController.getAll);
router.get('/:id', validateIdImage, imageController.getById);

// Protected routes (require admin authentication)
router.post('/', verifyAdminToken, validateCreateImage, imageController.create);
router.put('/:id', verifyAdminToken, validateIdImage, validateUpdateImage, imageController.update);
router.delete('/:id', verifyAdminToken, validateIdImage, imageController.delete);

export default router;
