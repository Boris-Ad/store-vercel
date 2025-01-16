import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  name: z.string().min(1, { message: 'Обязательно для заполнения!' }).max(50),
  email: z.string().email({ message: 'Обязательно для заполнения!' }),
  password: z.string().min(6, { message: 'Минимум 6 символов' }).max(50),
});

const imageSchema = z
  .instanceof(File, { message: 'Обязательный параметр!' })
  .refine(file => file.size < 4500000, 'Не больше 4 Mb')
  .refine(file => file.size === 0 || file.type.startsWith('image/'), 'Обязательный параметр!');

export const createStoreDataSchema = z.object({
  name: z.string().min(1, { message: 'Обязательно для заполнения!' }).max(60, { message: 'Не больше 60 символов!' }),
  logo: imageSchema.refine(file => file.size > 0, 'Обязательный параметр!'),
  banner: imageSchema.refine(file => file.size > 0, 'Обязательный параметр!'),
});

export const updateStoreDataSchema = createStoreDataSchema.extend({
  logo: imageSchema.optional(),
  banner: imageSchema.optional(),
});

export const createCategorySchema = z.object({
  name: z.string().min(1, { message: 'Обязательно для заполнения!' }).max(20, { message: 'Не больше 20 символов!' }),
  image: imageSchema.refine(file => file.size > 0, 'Обязательный параметр!'),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, { message: 'Обязательно для заполнения!' }).max(20, { message: 'Не больше 20 символов!' }),
  image: imageSchema.optional(),
});
