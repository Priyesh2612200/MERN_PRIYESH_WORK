
import { Request, Response } from 'express';

import { UserModel } from '../../Models/userModel';

import { responseModel } from "../../../interface"
import Authservice from '../../Services/auth'


import userRepositary from '../../Repositary/UserRepositary/userRepositary';
import jwt from 'jsonwebtoken';

import * as dotenv from 'dotenv';
dotenv.config()
import bcrypt from 'bcrypt';
import permissionCheck from '../../Permission/PermissionValid';
import { PermissionData } from '../../Permission/PermissionList';
import { error } from 'console';



const register = async (req: Request, res: Response) => {

  let user: UserModel;
  const roleId = "64787138b50c881395fc5665";

  user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
    address: req.body.address,
    pincode: req.body.pincode,
    // roleId : req.body.roleId

  }

  try {



    // const userExist = await EmployeeRepository.authrepositary.findOne({ email: email });
    // if (userExist) {
    //   return res.status(422).json({ error: "Email already exists" });
    // }



    user.password = await Authservice.hashPassword(user.password as string)

    // let  UserDataValue = { name, email, password,mobile,address,pincode,roleId}
    let UserDataValue = {
      name: user.name,
      email: user.email,
      password: user.password,
      mobile: user.mobile,
      address: user.address,
      pincode: user.pincode,
      roleId: roleId,
    };

    let users = await userRepositary.create(UserDataValue)

    let userResponses: UserModel = {
      email: users.email,
      name: users.name,
      mobile: users.mobile,
      address: users.address,
      pincode: users.pincode,
      roleId: users.roleId
    }

    const token = jwt.sign(userResponses, process.env.APP_KEY as string, { expiresIn: 3600 })
    let response: responseModel = {
      status: 201,
      message: "data saved",
      data: { user: userResponses, accesstoken: token },
      error: null
    }

    res.status(201).json(response);
  }

  catch (e) {
    console.log("error", e)
    let response: responseModel = {
      status: 400,
      message: "data save failed",
      data: null,
      error: e as string
    }

    res.status(400).json(response);
  }


}


const login = async (req: Request, res: Response) => {

  let UserData: UserModel;
  UserData = {
    email: req.body.email,
    password: req.body.password
  }

  try {

    console.log("WWWWWWWWWWWWWWWWWWWWWW",UserData.email);

    const userResponse = await userRepositary.findByEmail(UserData.email)
    console.log("LOGIN USER RESPONSE ____",userResponse);
    var responseModel: responseModel


    if (userResponse && !await bcrypt.compare(UserData.password, userResponse!.password)) {
      responseModel = {
        status: 201,
        message: "please check login details",
        data: null,
        error: null
      }
    }
    else {
      if (userResponse != null) {
        UserData.id = userResponse.id
        UserData.name = userResponse.name as string

        const token = await jwt.sign(UserData, process.env.APP_KEY as string, { expiresIn: 3600 })

        let userResponses: UserModel = {
          id: userResponse.id,
          name: userResponse.name,
          email: userResponse.email,
          mobile: userResponse.mobile,
          address: userResponse.address,
          pincode: userResponse.pincode,
          role: userResponse?.role
        

        }
        responseModel = {
          status: 201,
          data: { user: userResponses, accessToken: token },
          message: "Loggedin Successfully",
          error: null
        }
      }
      else {
        responseModel = {
          status: 201,
          data: null,
          message: "please check your login details",
          error: null
        }
      }
    }


    res.status(201).send(responseModel);

  } catch (e) {
    console.log("error", e)


    res.status(400).json(e);
  }
}


const verifytoken = async (req: any, res: Response) => {

  try {
    const userResponse = await userRepositary.getUser(req.id)
    let response: responseModel = {
      status: 201,
      message: "User Get SuccessFully!",
      data: userResponse,
      error: null
    }
    res.status(201).json(response);
  } catch (e) {
    console.log(`Error: ${e}`)
    let response: responseModel = {
      status: 400,
      message: "User save failed",
      data: null,
      error: e as string
    }
    res.status(400).json(response);
  }
}

const getalldata = async (req: Request, res: Response) => {

  try {
    const postResponse = await userRepositary.getUserAllData()
    let response: responseModel = {
      status: 201,
      message: "User Get save successfully",
      data: postResponse,
      error: null
    }
    res.status(201).json(response);
  } catch (e) {
    let response: responseModel = {
      status: 400,
      message: "Get User failed",
      data: null,
      error: e as string
    }
    res.status(400).json(response);
  }
}




  const updateuserdata = async (req: Request, res: Response) => {

    const reqPermission= (req as any).permissions;
    if(permissionCheck(reqPermission,PermissionData.EDIT_USER_PERMISSION)){

    console.log(req.params)
    try {
  
      const updateduser = await userRepositary.update(req.params.id, {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        pincode: req.body.pincode
  
      });
  
      if (!updateduser) {
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
          message: "User updated successfully",
          data: { user: updateduser },
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
  }
  else{
    error("forbidden error 403");
    let response: responseModel = {
      status: 403,
      message: "forbidden error 403",
      data: null
    };
    res.status(403).json(response);
  }
  }
  



const deleteuserdata = async (req: Request, res: Response) => {

  try {
    console.log(req.params)

    const deleteduser = await userRepositary.delete(req.params.id);

    if (deleteduser) {
      let response: responseModel = {
        status: 200,
        message: "User deleted successfully",
        data: null,
        error: null,
      };
      console.log("deleteresponse", response)
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
    console.log("deleteerror", e)
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
  login,
  register,
  verifytoken,
  getalldata,
  updateuserdata,
  deleteuserdata
}


