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


  async getsortdata(key: string, sortType: any, sortFieldName: string,pageNumber: number) {
    const pageSize = 10; // Number of items per page
    var searchUser: any = [];
    let sort = {}
    let search = {}
    
    if (sortType) {
      sort = {
        [sortFieldName]: sortType
      }
    }

    if (key) {
      console.log('key: ', key);
      search = {
        title: {
          contains: key,

        },
      }

    }
    console.log('search: ', search);


    searchUser = await prisma.productData.findMany({

     include:{
        categorylist:{
          select:{
            name:true,
            id:true
          }
        }
     },
      where: search,
      orderBy: sort,
      take: pageNumber || pageSize

    });

    return searchUser

  };



  // async getsortdata(key: string, sortType: any, sortFieldName: string, pageNumber: number) {

 

  //   const pageSize = 10; // Number of items per page
  // var searchUser: any = [];
  //   let sort: any = {};
  //   let search: any = {};
  
  //   if (sortType) {
  //     sort[sortFieldName] = sortType;
  //   }
  
  //    if (key) {
  //     console.log('key: ', key);
  //     search = {
  //       title: {
  //         contains: key,

  //       },
  //     }

  //   }
  //   console.log('search: ', search);
  
  //   searchUser = await prisma.productData.findMany({

  //        include:{
  //           categorylist:{
  //             select:{
  //               name:true,
  //               id:true
  //             }
  //           }
  //        },
  //         where: search,
  //         orderBy: {
  //           [sortFieldName]: sortType, // Use the provided sort type and field name for sorting
  //         },
  //         take: pageNumber || pageSize
    
  //       });
    
  //       return searchUser
    
  //     };
  
 


  // async getsortdata() {
  //   return await prisma.productData.findMany({
  //     include:{
  //       categorylist:{
  //         select:{
  //           name:true,
  //           id:true
  //         }
  //       }
  //    },
  //   });
  // }
 


  async delete(id: string) {
    const deletedProduct = await prisma.productData.delete({
      where: { id },
    });
    return deletedProduct;
  }

}



export default new productRepository();
