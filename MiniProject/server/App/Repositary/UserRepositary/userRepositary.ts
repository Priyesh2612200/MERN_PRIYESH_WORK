import { PrismaClient } from "@prisma/client";

// import { Empmodel } from '../../Models/interface';
import { UserModel } from "../../Models/userModel";

const prisma = new PrismaClient();

class UserRepository {
  async create(usermodel: UserModel) {
    let responseUser = await prisma.userList.create({
      data: {
        name: usermodel.name,
        email: usermodel.email,
        password: usermodel.password,
        mobile: usermodel.mobile,
        address: usermodel.address,
        pincode: usermodel.pincode,
        roleId: usermodel.roleId,
      },
    });

    return responseUser;
  }

  async findByEmail(email: string) {
    return await prisma.userList.findUnique({
      where: {
        email: email,
      },
      include:{
        role:{
          include:{
            permission:true
          }
        }
      }
  
    
      
    // async findByEmail(email: string) {
    //   return await prisma.userList.findUnique({
    //     where: {
    //       email: email,
    //     },
    //   include:{
    //     role:{
    //       select:{
    //         permission:true
    //       }
    //     }
    //   }
     
   
    });
  }

  

  async getUser(userid: string) {
    // return await prisma.empAuthData.findMany();
    return await prisma.userList.findMany({
      where: {
        id: userid,
      },
    });
  }

  async getUserAllData() {
    return await prisma.userList.findMany();
  }

  async update(id: string, usermodel: UserModel) {
    const updateduser = await prisma.userList.update({
      where: { id },
      data: {
        name: usermodel.name,
        email: usermodel.email,
        password: usermodel.password,
        mobile: usermodel.mobile,
        address: usermodel.address,
        pincode: usermodel.pincode,
        roleId: usermodel.roleId,
      },
    });
    return updateduser;
  }

  async delete(id: string) {
    const deletedPost = await prisma.userList.delete({
      where: { id },
    });
    return deletedPost;
  }


async  getUserPermission(userId: string) {
  try {
    const user = await prisma.userList.findMany({
      where:{id:userId},
      include:{
        role:{
          include:{
            permission:true
          }
        }
      }
    });

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    
    throw new Error('Failed to fetch user permissions');
  }
}

}

export default new UserRepository();
