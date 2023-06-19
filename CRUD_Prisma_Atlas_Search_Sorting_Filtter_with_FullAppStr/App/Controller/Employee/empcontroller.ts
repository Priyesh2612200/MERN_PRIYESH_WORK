import {Request, Response} from 'express'
import { EmpListModel } from "../../Models/empmodel"
import userrepositary from '../../Repositary'
import { responseModel } from '../../../interface'


const saveemp =  async (req: Request, res: Response) => {
    console.log('Request: ' + req.body.name)
    const empuser : EmpListModel = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        address: req.body.address,
        emptype: req.body.emptype,
        managerId:req.body.managerId
    }
    console.log('User Req' + empuser)
    try {
        const userResponse = await userrepositary.EmpRepositary.create(empuser)
        let response : responseModel = {
            status: 201,
            message: "User save successfully",
            data: userResponse,
            error: null
        }
        console.log(response);
        res.status(201).json(response);

    } catch (e) {
        console.log(e);
        let response : responseModel = {
            status: 400,
            message: "User save failed",
            data: null,
            error: e as string
        }
        res.status(400).json(response);
        
    }
}

const getemp = async (req: Request, res: Response) => {
    
    try {
        const userResponse = await userrepositary.EmpRepositary.getUser()
        let response : responseModel = {
            status: 201,
            message: "User save successfully",
            data: userResponse,
            error: null
        }
        res.status(201).json(response);
    } catch (e) {
      console.log(`Error: ${e}`)
        let response : responseModel = {
            status: 400,
            message: "User save failed",
            data: null,
            error: e as string
        }
        res.status(400).json(response);
    }
}
const updateemp = async (req: Request, res: Response) => {
    console.log(req.params)
    try {
      const updatedUser = await userrepositary.EmpRepositary.update(req.params.id, {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        address: req.body.address,
        emptype: req.body.emptype,
        managerId:req.body.managerId
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

  const deleteemp = async (req: Request, res: Response) => {
 
    try {
      console.log(req.params)

      const deletedUser = await userrepositary.EmpRepositary.delete(req.params.id);
  
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





export default {
    saveemp,
    getemp,
    updateemp,
    deleteemp
}