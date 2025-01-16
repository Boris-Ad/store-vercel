'use server';

import { put, del } from '@vercel/blob';
import { createCategorySchema, updateCategorySchema } from '@/lib/zod.schemas';
import prisma from '@/server/prisma';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

interface ICategoryState {
  name?: string[] | undefined;
  image?: string[] | undefined;
  success?: string;
}

export const createCategoryAction = async (_prevState: unknown, formData: FormData): Promise<ICategoryState> => {
  const validatedFields = createCategorySchema.safeParse(Object.fromEntries(formData));
  if (validatedFields.success === false) {
    return validatedFields.error.formErrors.fieldErrors;
  }

  const { name, image } = validatedFields.data;

  const category = await prisma.category.findUnique({ where: { name } });

  if (category) {
    return { name: ['Категория с таким именем уже есть!'] };
  }

  const blobImage = await put(crypto.randomUUID() + image.name, image, { access: 'public' });

  await prisma.category.create({ data: { name, imageUrl: blobImage.url } });

  revalidatePath('/dashboard/products/new');
  return { success: 'Категория создана!' };
};

export const updateCategoryAction = async (categoryId: string, _prevState: unknown, formData: FormData): Promise<ICategoryState> => {
  const validatedFields = updateCategorySchema.safeParse(Object.fromEntries(formData));
  if (validatedFields.success === false) {
    return validatedFields.error.formErrors.fieldErrors;
  }
  const { name, image } = validatedFields.data;

  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (category == null) notFound();

  let blobImage;

  if (image && image.size > 0) {
    await del(category.imageUrl);
    blobImage = await put(crypto.randomUUID() + image.name, image, { access: 'public' });
  }

  await prisma.category.update({ where: { id: categoryId }, data: { name, imageUrl: blobImage?.url } });
  revalidatePath('/dashboard/products/new');
  return { success: 'Категория обновлена!' };
};

export const deleteCategoryAction = async (categoryId: string) => {
  const category = await prisma.category.findUnique({ where: { id: categoryId }, select: { imageUrl: true, images: true } });
  if (category == null) notFound();
  const { imageUrl, images } = category;

  for (const image of images) {
    await del(image.url);
  }
  await del(imageUrl);
  await prisma.category.delete({ where: { id: categoryId } });
  revalidatePath('/dashboard/products/new');
};
