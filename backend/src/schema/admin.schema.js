import { z } from 'zod';

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/
)

export const registerAdminSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    lastname: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    username: z.string().min(3, 'Username must be at least 3 characters long').max(20, 'Username must be at most 20 characters long'),
    password: z.string().min(8, 'Password must be at least 8 characters long')
      .max(32, 'Password must be at most 32 characters long')
      .regex(passwordValidation, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' }),
    role: z.enum(['President', 'Vicepresident', 'Secretary', 'Treasurer', 'Asesor', 'Vocal', 'Member'], { message: 'Invalid role' }),
});

export const loginAdminSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required')
});

export const updateAdminSchema = z.object({
    name: z.string().min(1, 'Name is required').optional(),
    lastname: z.string().min(1, 'Last name is required').optional(),
    email: z.string().email('Invalid email address').optional(),
    username: z.string().min(3, 'Username must be at least 3 characters long').max(20, 'Username must be at most 20 characters long').optional(),
    password: z.string().min(8, 'Password must be at least 8 characters long')
      .max(32, 'Password must be at most 32 characters long')
      .regex(passwordValidation, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' })
      .optional(),
    role: z.enum(['President', 'Vicepresident', 'Secretary', 'Treasurer', 'Asesor', 'Vocal', 'Member'], { message: 'Invalid role' }).optional(),
});

export const idAdminSchema = z.object({
    id: z.string().uuid('Invalid UUID format')
});