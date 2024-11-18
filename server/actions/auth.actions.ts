'use server';

import bcrypt from 'bcryptjs';
import { signIn } from '@/server/auth';
import { AuthError } from 'next-auth';
import prisma from '@/server/prisma';
import { registerSchema } from '@/lib/zod.schemas';
import { redirect } from 'next/navigation';

export const loginAction = async (_prev: string | undefined, formData: FormData) => {
  try {
    await signIn('credentials', formData);
  } catch (err) {
    if (err instanceof AuthError) {
      return 'Неверные данные!';
    }
    throw err;
  }
};

export const registerAction = async (callbackUrl: string, _prev: unknown, formData: FormData) => {
  const validatedFields = registerSchema.safeParse(Object.fromEntries(formData));

  if (validatedFields.success === false) {
    return validatedFields.error.formErrors.fieldErrors;
  }

  const { name, email, password } = validatedFields.data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    return {
      email: ['Этот email уже используется!'],
    };
  }
  const pwHash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { name, email, password: pwHash } });

  redirect('/auth/login?' + callbackUrl);
};
