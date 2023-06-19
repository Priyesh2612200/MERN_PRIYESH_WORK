import { PrismaClient } from "@prisma/client";
import { ProductModel } from "../Model/interface";

const prisma = new PrismaClient();

class productRepository {
  async createProduct(formCheck:ProductModel) {
    try {
      console.log("title", formCheck.title);
    const responseForm = await prisma.productData.create({
        data:{
            title:formCheck.title,
            description:formCheck.description,
            category:formCheck.category,
            file:String(formCheck.file),
            categoryId:formCheck.categoryId
        }
    })
      console.log("responseForm", responseForm);
      return responseForm;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


export default new productRepository();
