import { Request, Response } from "express";
import { responseModel } from "../../Models/responseModel";
import getSupplierrepositary from "../../Repositary/supplierrepositary/getSupplierrepositary";
import * as dotenv from "dotenv";
dotenv.config();

const getsupplier = async (req: Request, res: Response) => {
  try {
    const supplierResponse =
      await getSupplierrepositary.getSupplierAllData();
    let response: responseModel = {
      status: 201,
      message: "Supplier Get save successfully",
      data: supplierResponse,
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
  getsupplier,
};
