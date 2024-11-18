'use server';

import { put, del } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { updateStoreDataSchema } from '@/lib/zod.schemas';
import prisma from '@/server/prisma';
import { notFound } from 'next/navigation';

interface StoreDataProps {
  name?: string[];
  logo?: string[];
  banner?: string[];
  success?: string;
}

export const updateStoreDataAction = async (_prevState: unknown, formData: FormData): Promise<StoreDataProps> => {
  const store = await prisma.store.findUnique({ where: { id: 1 } });
  if (store == null) notFound();

  const validatedFields = updateStoreDataSchema.safeParse(Object.fromEntries(formData));
  if (validatedFields.success === false) {
    return validatedFields.error.formErrors.fieldErrors;
  }
  const { name, logo, banner } = validatedFields.data;

  let logoPath;
  let bannerPath;

  if (logo && logo.size > 0) {
    await del(store.logo);
    logoPath = await put(crypto.randomUUID() + logo.name, logo, { access: 'public' });
  }

  if (banner && banner.size > 0) {
    await del(store.banner);
    bannerPath = await put(crypto.randomUUID() + banner.name, banner, { access: 'public' });
  }

  await prisma.store.update({ where: { id: 1 }, data: { name, logo: logoPath?.url, banner: bannerPath?.url } });

  revalidatePath('/dashboard/settings');
  return { success: 'Данные обновлены!' };
};
