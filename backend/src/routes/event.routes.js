import express from 'express';
import eventController from '../controllers/event.controller.js';
import { verifyAdminToken } from '../middleware/admin.middleware.js';
import { validateEvent } from '../middleware/validateEvent.middleware.js';

import {
    createEventSchema,
    updateEventSchema,
    idEventSchema
} from '../schema/event.schema.js';

const EventRoutes = express.Router();

// Public routes
EventRoutes.get(
    '/',
    eventController.getAll
);

EventRoutes.get(
    '/:id',
    validateEvent(idEventSchema, 'params'),
    eventController.getById
);

// Protected routes (require admin authentication)
EventRoutes.post(
    '/',
    verifyAdminToken,
    validateEvent(createEventSchema, 'body'),
    eventController.create
);

EventRoutes.put(
    '/:id',
    verifyAdminToken,
    validateEvent(idEventSchema, 'params'),
    validateEvent(updateEventSchema, 'body'),
    eventController.update
);

EventRoutes.delete(
    '/:id',
    verifyAdminToken,
    validateEvent(idEventSchema, 'params'),
    eventController.delete
);

export default EventRoutes;