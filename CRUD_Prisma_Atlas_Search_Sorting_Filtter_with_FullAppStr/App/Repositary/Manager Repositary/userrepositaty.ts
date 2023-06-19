import { PrismaClient, SeniorEmpList } from '@prisma/client'
import { ManagerListModel } from "../../Models/managermodel"
import { stringify } from 'querystring'

const prisma = new PrismaClient()

class UserRepository {

  async create(userModel: ManagerListModel) {
    let resposeUser = await prisma.managerList.create({
      data: {
        name: userModel.name,
        email: userModel.email,
        city: userModel.city,
        managerrole: userModel.managerrole,
        salary: userModel.salary,
        seniorempid: userModel.seniorempid
      }
    })
    return resposeUser
  }

  async getUser() {
    //     return await prisma.managerList.findMany({
    //         where: {
    //             salary: {
    //                 gt: 50000,
    //           },
    //         },
    //       });

    // return await prisma.managerList.findMany({
    //     orderBy: {
    //       name:'asc'
    //     },
    //   });

    // return await prisma.managerList.findMany({
    //   include: {
    //     senioremplist: {
    //       select: {
    //         name: true,
    //         salary: true
    //       }
    //     }
    //   },
    // });

    // return await prisma.managerList.findMany({
    //   where: {
    //     name: 'Shiv',
    //   },
    //   include: {

    //     senioremplist:true
    //   },
    // })

    // return await prisma.managerList.findMany({
    //   include: {
    //     employeelist: {
    //       select: {
    //         name: true,
    //         age: true
    //       },
    //       where: {
    //         AND: [
    //           { age: { gte: 20 } },
    //           { name: 'priyesh' }
    //         ]
    //       }

    //     },
    //   }
    // });

    return await prisma.managerList.findMany({
      include: {

        senioremplist:{
            select:
            {
              name:true,
              city:true,
            }
        },
        employeelist: {
          select: {
            name: true,
            age: true
          },
          where: {
            AND: [
              { age: { gte: 20 } },
              { name: 'priyesh' }
            ]
          }

        },
      }
    });



  }

  async update(id: string, usermodel: ManagerListModel) {
    const updatedUser = await prisma.managerList.update({
      where: { id },
      data: {
        name: usermodel.name,
        email: usermodel.email,
        city: usermodel.city,
        managerrole: usermodel.managerrole,
        salary: usermodel.salary,
        seniorempid: usermodel.seniorempid
      },
    });
    return updatedUser;
  }

  async delete(id: string) {
    const deletedUser = await prisma.managerList.delete({
      where: { id },
    });
    return deletedUser;
  }


  async getsortdata(key: string, sortType: any, sortFieldName: string) {
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
      search = {
        OR: [{
          name: {
            contains: key,

          },
        },
        {
          city: {
            contains: key,
          },

        }

        ]
      }

    }
    console.log('search: ', search);

  

    searchUser = await prisma.managerList.findMany({
      where: search,
      orderBy: sort,

    });

    return searchUser

  };
}

export default new UserRepository;