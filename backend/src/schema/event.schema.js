import {z} from 'zod';

const baseEventSchema = {
    title: z.string().min(1, 'Title is required').max(100),
    description: z.string().min(1, 'Description is required').max(4000),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }),
    location: z.string().min(1, 'Location is required').max(200),
    goal: z.number().min(0, 'Goal must be a positive number'),
    perfilRequired: z.string().min(1, 'Perfil required is mandatory').max(200),
    image: z.string().url('Invalid image URL')
}

export const createEventSchema = z.object({
    ...baseEventSchema,
});

export const updateEventSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100).optional(),
    description: z.string().min(1, 'Description is required').max(4000).optional(),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }).optional(),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }).optional(),
    location: z.string().min(1, 'Location is required').max(200).optional(),
    goal: z.number().min(0, 'Goal must be a positive number').optional(),
    perfilRequired: z.string().min(1, 'Perfil required is mandatory').max(200).optional(),
    image: z.string().url('Invalid image URL').optional()
});

export const idEventSchema = z.object({
    id: z.string().uuid('Invalid event ID format'),
});