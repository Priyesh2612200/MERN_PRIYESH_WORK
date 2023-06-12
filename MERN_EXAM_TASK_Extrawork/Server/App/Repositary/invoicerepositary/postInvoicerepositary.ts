import { PrismaClient } from "@prisma/client";
import { invoiceModel } from "../../Models/interface";
import { error } from "console";


const prisma = new PrismaClient();
import { ObjectId } from 'mongodb';

class InvoiceRepository {
  // async createInvoice(InvoicesModelData: any) {
  //   try {
  //     console.log("DESC:", InvoicesModelData);
  //     let respos = await prisma.invoice_Details.createMany({
  //       data: InvoicesModelData,
  //     });
  //     return respos;
  //   } catch (error) {
  //     console.log("ERROR");
  //     throw new Error("Failed to create invoice");
  //   }
  // }

 
  async createInvoice(invoicesModelData: any) {
    try {
      const month = invoicesModelData.month;
      console.log("MONTH___", month);
      console.log("ID----",invoicesModelData)
      let existingInvoice = await prisma.invoice_Details.findFirst({
        where: {
          month: month,
        },
      });
  console.log("INVOICE ID___",existingInvoice)
      if (existingInvoice) {

        let responseInvoice = await prisma.invoice_Details.update({
          where: { id: existingInvoice.supplierId },
          data: invoicesModelData,
        });
        return responseInvoice;
      } 
      else {
        let responseInvoice = await prisma.invoice_Details.create({
          data: invoicesModelData,
        });
        return responseInvoice;
      }
    } catch (error) {
      console.log("ERROR:", error);
      throw new Error("Failed to create/update invoice");
    }
  }


  async getInvoiceAllData(month:string) {
   console.log("MONTH____",month)
    return await prisma.invoice_Details.findMany({
      where: {
        month: month,
      },
      include: {
        supplier: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async update(usermodel: any) {
    const updatedinvoice = await prisma.invoice_Details.updateMany({
      data: usermodel,
    });
    return updatedinvoice;
  }
}

export default new InvoiceRepository();
