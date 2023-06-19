import {Request, Response} from 'express'
import { UserListModel } from "../../Models/usermodel"
import userRespositary from '../../Repositary'
import { responseModel } from '../../../interface'


const saveUser =  async (req: Request, res: Response) => {
    console.log('Request: ' + req.body.name)
    const user : UserListModel = {
        name: req.body.name,
        hrtype : req.body.hrtype,
        email: req.body.email,
        empid:req.body.empid
    }
    console.log('User Req' + user)
    try {
        const userResponse = await userRespositary.HrRepositary.create(user)
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

const getUser = async (req: Request, res: Response) => {
    
    try {
        const userResponse = await userRespositary.HrRepositary.getUser()
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

const updatedata = async (req: Request, res: Response) => {
    console.log(req.params)
    try {
      const updatedUser = await userRespositary.HrRepositary.update(req.params.id, {
        name: req.body.name,
        hrtype : req.body.hrtype,
        email: req.body.email,
        empid:req.body.empid
        
      
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

  const deletedata = async (req: Request, res: Response) => {
 
    try {
      console.log(req.params)

      const deletedUser = await userRespositary.HrRepositary.delete(req.params.id);
  
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


  const getresult = async (req: Request, res: Response) => {
    const search = req.query.search as string
    const sort = req.query.sort as string
    const sortFieldName = req.query.sortFieldName as string
  try {
      const userResponse = await userRespositary.HrRepositary.getresult(search,sort,sortFieldName)     
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
    saveUser,
    getUser,
    updatedata,
    deletedata,
    getresult
}