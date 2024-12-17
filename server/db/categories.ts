import prisma from '@/server/prisma';

export const getCategories = async () => {
  return await prisma.category.findMany();
};
