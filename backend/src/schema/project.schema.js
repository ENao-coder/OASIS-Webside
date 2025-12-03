import { z } from 'zod';

const baseProjectSchema = {
    title: z.string().min(1, 'Title is required').max(100),
    description: z.string().min(1, 'Description is required').max(4000),
    goal: z.string().min(1, 'Goal is required').max(200),
    perfilRequired: z.string().min(1, 'Perfil required is mandatory').max(200),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }).optional(),
    status: z.enum(['Active', 'Completed', 'On-hold']),
    image: z.string().url('Invalid image URL').optional()
};

export const createProjectSchema = z.object({
    ...baseProjectSchema,
});

export const updateProjectSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100).optional(),
    description: z.string().min(1, 'Description is required').max(4000).optional(),
    goal: z.string().min(1, 'Goal is required').max(200).optional(),
    perfilRequired: z.string().min(1, 'Perfil required is mandatory').max(200).optional(),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }).optional(),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }).optional(),
    status: z.enum(['Active', 'Completed', 'On-hold']).optional(),
    image: z.string().url('Invalid image URL').optional()
});

export const idProjectSchema = z.object({
    id: z.string().uuid('Invalid project ID format'),
});