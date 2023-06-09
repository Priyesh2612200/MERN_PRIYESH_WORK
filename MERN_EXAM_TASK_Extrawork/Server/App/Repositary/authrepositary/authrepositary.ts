import {PrismaClient} from '@prisma/client';

import { userModel } from '../../Models/interface';



const prisma=new PrismaClient();

class UserRepository{



    async create(usermodel: userModel) {
        let responseUser = await prisma.userDetails.create({
          data: {
            name:usermodel.name,
            email:usermodel.email,
            phone:usermodel.phone,
            password:usermodel.password,
       

          }
        });
      
        return responseUser;
      }


      async findByEmail(email:string){
        return await prisma.userDetails.findFirst({where:{
            email:email,
        }})
      }

      async getUser(userid:string){
        // return await prisma.empAuthData.findMany();
        return await prisma.userDetails.findMany({
          where:{
            id:userid
          }
        });
      }

      async update(id: string, usermodel: userModel) {
        const updateduser = await prisma.userDetails.update({
          where: { id },
          data: {
            name:usermodel.name,
            // email:usermodel.email,
            phone:usermodel.phone,
            // password:usermodel.password,
       
          },
        });
        return updateduser;
      }

      async getUserAllData() {
        return await prisma.userDetails.findMany();
      }
}

export default new UserRepository();
