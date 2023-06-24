import { PrismaClient } from "@prisma/client";
import { StockModel } from "../../Model/interface";

const prisma = new PrismaClient();

class StockRepository {

    async findByName(name: string) {
        return await prisma.stock.findUnique({
          where: {
            name,
          },
        });
      }
      
      async create(postCheck: any) {
        try {
          const existingStock = await this.findByName(postCheck.name);
          if (existingStock) {
            throw new Error('Stock with the same name already exists');
          }
      
          const response = await prisma.stock.create({
            data: {
              name: postCheck.name,
              qty: Number(postCheck.qty),
            },
          });
      
     
          return response;
        } catch (error) {
          console.error('Error occurred while saving stock:', error);
          throw new Error('Stock save failed');
        }
      }

      

      async getStock(){
        return await prisma.stock.findMany({
            include:{
                orders:true
            }
        })
    }
      
    async deleteStock(id: string) {
        const deletedUser = await prisma.stock.delete({
          where: {id},
        });
        return deletedUser;
      }

  }


export default new StockRepository();