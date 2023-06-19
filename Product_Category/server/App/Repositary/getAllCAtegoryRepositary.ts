import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class allCategoryRepository {
    async getCatagory() {

        return await prisma.category.findMany({
           

        })
    }
}

export default new allCategoryRepository;