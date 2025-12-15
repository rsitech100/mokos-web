import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'Nama depan minimal 2 karakter'),
  lastName: z.string().min(2, 'Nama belakang minimal 2 karakter'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  address: z.string().min(10, 'Alamat minimal 10 karakter'),
  role: z.enum(['owner', 'user']),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password harus diisi'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
