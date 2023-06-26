import { PrismaClient } from "@prisma/client";
import { OrderModel } from "../../Model/interface";


const prisma = new PrismaClient();

class OrderRepository {
    async create(postCheck: any) {
              
        const response = await prisma.order.create({
          data: {
            customerName: postCheck.customerName,
            orderQty: postCheck.orderQty,
            stock: {
              connect: {
                id: postCheck.stockId
              }
            }
          },
        });
            
        console.log("response", response);
        return response;
      }
      
      async getorder(){
        return await prisma.order.findMany(
          {
            include:{
                stock:true
                   
            }
          }
        )
    }


    async deleteOrder(id: string) {
      const deletedUser = await prisma.order.delete({
        where: {id},
      });
      return deletedUser;
    }
      
}

export default new OrderRepository();