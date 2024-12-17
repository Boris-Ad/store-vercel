import prisma from '@/server/prisma';

export const getStore = async () => {
  return await prisma.store.findUnique({ where: { id: 1 } });
};
