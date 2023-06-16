import { Request, Response } from "express";
import { userModel } from "../../Models/interface";
import { responseModel } from "../../Models/responseModel";
import Authservice from "../../Services/auth";

import UserRepository from "../../Repositary/index";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
  let user: userModel;
  user = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  };

  try {
    user.password = await Authservice.hashPassword(user.password as string);
    let users = await UserRepository.authrepositary.create(user);

    let userResponses: userModel = {
      email: users.email,
      name: users.name,
      phone: users.phone,
    };

    const token = jwt.sign(userResponses, process.env.APP_KEY as string, {
      expiresIn: 3600,
    });
    let response: responseModel = {
      status: 201,
      message: "data saved",
      data: { user: userResponses, accesstoken: token },
      error: null,
    };

    res.status(201).json(response);
  } catch (e) {
    console.log("error", e);
    let response: responseModel = {
      status: 400,
      message: "data save failed",
      data: null,
      error: e as string,
    };

    res.status(400).json(response);
  }
};

const login = async (req: Request, res: Response) => {
  let UserData: userModel;
  UserData = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    console.log(UserData);

    const userResponse = await UserRepository.authrepositary.findByEmail(
      UserData.email
    );
    var responseModel: responseModel;

    if (
      userResponse &&
      !(await bcrypt.compare(UserData.password, userResponse!.password))
    ) {
      responseModel = {
        status: 201,
        message: "please check login details",
        data: null,
        error: null,
      };
    } else {
      if (userResponse != null) {
        UserData.id = userResponse.id;
        UserData.name = userResponse.name as string;

        const token = await jwt.sign(UserData, process.env.APP_KEY as string, {
          expiresIn: 3600,
        });

        let userResponses: userModel = {
          id: userResponse.id,
          name: userResponse.name,
          email: userResponse.email,
          phone: userResponse.phone,
        };
        responseModel = {
          status: 201,
          data: { user: userResponses, accessToken: token },
          message: "Loggedin Successfully",
          error: null,
        };
      } else {
        responseModel = {
          status: 201,
          data: null,
          message: "please check your login details",
          error: null,
        };
      }
    }

    res.status(201).send(responseModel);
  } catch (e) {
    console.log("error", e);

    res.status(400).json(e);
  }
};

const verifytoken = async (req: any, res: Response) => {
  try {
    const userResponse = await UserRepository.authrepositary.getUser(req.id);
    let response: responseModel = {
      status: 201,
      message: "User Get SuccessFully!",
      data: userResponse,
      error: null,
    };
    res.status(201).json(response);
  } catch (e) {
    console.log(`Error: ${e}`);
    let response: responseModel = {
      status: 400,
      message: "User save failed",
      data: null,
      error: e as string,
    };
    res.status(400).json(response);
  }
};

const updateuserdata = async (req: Request, res: Response) => {
  console.log(req.params);
  try {
    const updateduser = await UserRepository.authrepositary.update(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
      }
    );

    if (!updateduser) {
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
};

const getalldata = async (req: Request, res: Response) => {
  try {
    const userResponse = await UserRepository.authrepositary.getUserAllData();
    let response: responseModel = {
      status: 201,
      message: "User Get save successfully",
      data: userResponse,
      error: null,
    };
    res.status(201).json(response);
  } catch (e) {
    let response: responseModel = {
      status: 400,
      message: "Get User failed",
      data: null,
      error: e as string,
    };
    res.status(400).json(response);
  }
};

export default {
  login,
  register,
  verifytoken,
  updateuserdata,
  getalldata,
};
