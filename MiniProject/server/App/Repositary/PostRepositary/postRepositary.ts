import { PrismaClient } from "@prisma/client";
import { PostModel } from "../../Models/postModel";

const prisma = new PrismaClient();

class PostRepository {
  async create(postModel: PostModel) {
    console.log("DESC:", postModel.description);
    let resposepost = await prisma.postList.create({
        
      data: {
        title: postModel.title,
        description: postModel.description,
        category: postModel.category,
      },
  
      
    });


    return resposepost;
   
}

async getUser(){
    return await prisma.postList.findMany()
}

async update(id: string, postmodel: PostModel) {
    const updatedpost = await prisma.postList.update({
      where: { id },
      data: {
        title: postmodel.title,
        description: postmodel.description,
        category: postmodel.category,
      },
    });
    return updatedpost;
  }

  async delete(id: string) {
    const deletedUser = await prisma.postList.delete({
      where: {id},
    });
    return deletedUser;
  }

  async getbyid(){
    return await prisma.postList.findMany()
}
}



export default new PostRepository();
