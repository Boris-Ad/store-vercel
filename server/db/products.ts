import prisma from "@/server/prisma"

export const getProducts = async () => {
return await prisma.product.findMany()
}