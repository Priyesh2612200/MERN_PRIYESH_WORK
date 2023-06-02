import {Request, Response} from 'express'
import { PostModel } from "../../Models/postModel"
import postRespositary from '../../Repositary'
import { responseModel } from '../../../interface'


const savePost =  async (req: Request, res: Response) => {
    console.log('Request: ' + req.body.title)
    const post : PostModel = {
        title: req.body.title,
        description : req.body.description,
        category: req.body.category
    }
    console.log('Post Req' + post)
    try {
        const postResponse = await postRespositary.PostRepositary.create(post)
        let response : responseModel = {
            status: 201,
            message: "Post save successfully",
            data: postResponse,
            error: null
        }
        res.status(201).json(response);
    } catch (e) {
        let response : responseModel = {
            status: 400,
            message: "POst save failed",
            data: null,
            error: e as string
        }
        res.status(400).json(response);
    }
}


const getPost = async (req: Request, res: Response) => {
    
    try {
        const postResponse = await postRespositary.PostRepositary.getUser()
        let response : responseModel = {
            status: 201,
            message: "Post save successfully",
            data: postResponse,
            error: null
        }
        res.status(201).json(response);
    } catch (e) {
        let response : responseModel = {
            status: 400,
            message: "Post save failed",
            data: null,
            error: e as string
        }
        res.status(400).json(response);
    }
}

const updatePost = async (req: Request, res: Response) => {
    console.log(req.params)
    try {
      const updatedpost = await postRespositary.PostRepositary.update(req.params.id, {
        title: req.body.title,
        description : req.body.description,
        category: req.body.category
      
      });

      if (!updatedpost) {
        let response: responseModel = {
          status: 404,
          message: "POST not found",
          data: null,
          error: null,
        };
        res.status(404).json(response);
      } else {
        let response: responseModel = {
          status: 200,
          message: "Post updated successfully",
          data: { user: updatedpost },
          error: null,
        };
        res.status(200).json(response);
      }
    } catch (e) {
      let response: responseModel = {
        status: 500,
        message: "Data update failed",
        data: null,
        error: e as string,
      };
      res.status(500).json(response);
    }
  };

  const deletePost = async (req: Request, res: Response) => {
 
    try {
      console.log(req.params)

      const deletedpost = await postRespositary.PostRepositary.delete(req.params.id);
  
      if (deletedpost) {
        let response: responseModel = {
          status: 200,
          message: "Post deleted successfully",
          data: null,
          error: null,
        };
        console.log("deleteresponse",response)
        res.status(200).json(response);
      } else {
        let response: responseModel = {
          status: 404,
          message: "Post not found",
          data: null,
          error: null,
        };
        res.status(404).json(response);
      }
    } catch (e) {
      console.log("deleteerror",e)
      let response: responseModel = {
        status: 500,
        message: "Data delete failed",
        data: null,
        error: e as string,
      };
      res.status(500).json(response);
    }
  };

  const getbyid = async (req: Request, res: Response) => {
    
    try {
        const postResponse = await postRespositary.PostRepositary.getbyid()
        let response : responseModel = {
            status: 201,
            message: "Post Get successfully",
            data: postResponse,
            error: null
        }
        res.status(201).json(response);
    } catch (e) {
        let response : responseModel = {
            status: 400,
            message: "Post save failed",
            data: null,
            error: e as string
        }
        res.status(400).json(response);
    }
}

export default {
    savePost,
    getPost,
    updatePost,
    deletePost,
    getbyid
}