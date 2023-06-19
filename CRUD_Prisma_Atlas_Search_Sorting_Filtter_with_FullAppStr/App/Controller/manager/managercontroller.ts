import {Request, Response} from 'express'
import { ManagerListModel } from "../../Models/managermodel"
import userRespositary from '../../Repositary'
import { responseModel } from '../../../interface'


const saveManager =  async (req: Request, res: Response) => {
    console.log('Request: ' + req.body.name)
    const user : ManagerListModel = {
        name: req.body.name,
        email:req.body.email,
        city:req.body.city,
        managerrole:req.body.managerrole,
        salary:req.body.salary,
        seniorempid:req.body.seniorempid
    }
    console.log('User Req' + user)
    try {
        const userResponse = await userRespositary.ManagerRepositary.create(user)
        let response : responseModel = {
            status: 201,
            message: "User save successfully",
            data: userResponse,
            error: null
        }
        res.status(201).json(response);
    } catch (e) {
        let response : responseModel = {
            status: 400,
            message: "User save failed",
            data: null,
            error: e as string
        }
        res.status(400).json(response);
    }
}

const getManager = async (req: Request, res: Response) => {
    
    try {
        const userResponse = await userRespositary.ManagerRepositary.getUser()
       
        let response : responseModel = {
            status: 201,
            message: "User Get successfully",
            data: userResponse,
            error: null
        }
        res.status(201).json(response);
    } catch (e) {
        let response : responseModel = {
            status: 400,
            message: "User Get to failed",
            data: null,
            error: e as string
        }
        res.status(400).json(response);
    }
}
const updateManager = async (req: Request, res: Response) => {
    console.log(req.params)
    try {
      const updatedUser = await userRespositary.ManagerRepositary.update(req.params.id, {
        name: req.body.name,
        email:req.body.email,
        city:req.body.city,
        managerrole:req.body.managerrole,
        salary:req.body.salary,
        seniorempid:req.body.seniorempid
      });

      if (!updatedUser) {
        let response: responseModel = {
          status: 404,
          message: "User not found",
          data: null,
          error: null,
        };
        res.status(404).json(response);
      } else {
        let response: responseModel = {
          status: 200,
          message: "User updated successfully",
          data: { user: updatedUser },
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

  const deleteManager = async (req: Request, res: Response) => {
 
    try {
      console.log(req.params)

      const deletedUser = await userRespositary.ManagerRepositary.delete(req.params.id);
  
      if (deletedUser) {
        let response: responseModel = {
          status: 200,
          message: "User deleted successfully",
          data: null,
          error: null,
        };
        console.log("deleteresponse",response)
        res.status(200).json(response);
      } else {
        let response: responseModel = {
          status: 404,
          message: "User not found",
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

const sortingManager = async (req: Request, res: Response) => {
    const search = req.query.search as string
    const sort = req.query.sort as string
    const sortFieldName = req.query.sortFieldName as string

  try {
      const userResponse = await userRespositary.ManagerRepositary.getsortdata(search,sort,sortFieldName)     
      let response : responseModel = {
          status: 201,
          message: "User Get successfully",
          data: userResponse,
          error: null
      }
      res.status(201).json(response);
  } catch (e) {
      let response : responseModel = {
          status: 400,
          message: "User Get to failed",
          data: null,
          error: e as string
      }
      res.status(400).json(response);
  }
}


export default {
    saveManager,
    getManager,
    updateManager,
    deleteManager,
    sortingManager
}