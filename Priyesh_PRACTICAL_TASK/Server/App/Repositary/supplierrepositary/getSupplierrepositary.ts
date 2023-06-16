import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class SupplierRepository {
  async getSupplierAllData() {
    return await prisma.supplier.findMany();
  }
}

export default new SupplierRepository();
