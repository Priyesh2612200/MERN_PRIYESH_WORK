import { PrismaClient } from "@prisma/client";
import { invoiceModel } from "../../Models/interface";
import { error } from "console";

const prisma = new PrismaClient();

class InvoiceRepository {
  // async create(InvoicesModel: any) {
  //   try {
  //     console.log("DESC:", InvoicesModel);
  //     let respos = await prisma.invoice_Details.createMany({
  //       data: InvoicesModel,
  //     });
  //     return respos;
  //   } catch (error) {
  //     console.log("ERROR");
  //   }
  // }

  async create(invoiceModel: any) {
    try {
      let respos;
      const existingInvoiceDetails = await prisma.invoice_Details.findFirst({
        where: {
          month: invoiceModel.month,
        },
      });

      if (existingInvoiceDetails) {
        respos = await prisma.invoice_Details.updateMany({
          where: {
            id: existingInvoiceDetails.id,

            month: invoiceModel.month,
          },
          data: invoiceModel,
        });
      } else {
        respos = await prisma.invoice_Details.createMany({
          data: invoiceModel,
        });
      }
    } catch (error) {
      console.log("ERROR:", error);
      throw error;
    }
  }

  async getInvoiceAllData(month: string) {
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
