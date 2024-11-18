'use server';

import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { createStoreDataSchema } from '@/lib/zod.schemas';
import prisma from '@/server/prisma';

interface StoreDataProps {
  name?: string[];
  logo?: string[];
  banner?: string[];
  success?: string;
}

export const createStoreDataAction = async (_prevState: unknown, formData: FormData): Promise<StoreDataProps> => {
  const validatedFields = createStoreDataSchema.safeParse(Object.fromEntries(formData));

  if (validatedFields.success === false) {
    return validatedFields.error.formErrors.fieldErrors;
  }

  const { name, logo, banner } = validatedFields.data;

  const blobLogo = await put(crypto.randomUUID() + logo.name, logo, { access: 'public' });
  const blobBanner = await put(crypto.randomUUID() + banner.name, banner, { access: 'public' });

  await prisma.store.create({ data: { name, logo: blobLogo.url, banner: blobBanner.url } });

  revalidatePath('/dashboard/settings');
  return { success: 'Данные сохранены!' };
};
