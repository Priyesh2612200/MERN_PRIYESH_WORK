import { PrismaClient } from '@prisma/client'
import { UserListModel } from "../../Models/usermodel"

const prisma = new PrismaClient()

class UserRepository {

  async create(userModel: UserListModel) {
    let resposeUser = await prisma.hRList.create({
      data: {
        name: userModel.name,
        hrtype: userModel.hrtype,
        email: userModel.email,
        empid: userModel.empid
      }
    })
    return resposeUser
  }


  async getUser() {
    return await prisma.hRList.findMany()

    // return await prisma.hRList.findMany({
    //   include: {
    //     employeelist: {
    //       select: {
    //         name: true
    //       }
    //     }
    //   },
    // });

    return await prisma.hRList.findMany({
      
      include:{
        empliyeelist:{
          select:{
            name:true
          }
        }
      }
    })

  }

  async update(id: string, usermodel: UserListModel) {
    const updatedUser = await prisma.hRList.update({
      where: { id },
      data: {
        name: usermodel.name,
        hrtype: usermodel.hrtype,
        email: usermodel.email,
        empid: usermodel.empid
      },
    });
    return updatedUser;
  }

  async delete(id: string) {
    const deletedUser = await prisma.hRList.delete({
      where: { id },
    });
    return deletedUser;
  }

  async getresult(key: string, sortType: any, sortFieldName: string) {
    console.log('key: ', key);
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
      search={
        name:{
          contains: key,
        }
      }

    }
    console.log('search: ', search);

    searchUser = await prisma.hRList.findMany({
      where: search,
      orderBy: sort
    });

    return searchUser

  };

}

export default new UserRepository;